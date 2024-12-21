module.exports = `DROP TABLE IF EXISTS user_bookie_accounts CASCADE;
DROP TABLE IF EXISTS user_bookies CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS userBets CASCADE;
DROP TABLE IF EXISTS sports CASCADE;
DROP TABLE IF EXISTS bookies CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(200) UNIQUE NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE bookies (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(100) UNIQUE NOT NULL, 
  logo_url VARCHAR(255), 
  website_url VARCHAR(255), 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sports (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(100) UNIQUE NOT NULL,
  icon_url VARCHAR(255) -- Added column to store the sport's icon URL
);

CREATE TABLE user_profiles (
  id SERIAL PRIMARY KEY, 
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  location VARCHAR(255),
  favorite_sport VARCHAR(100),
  preferred_bet_type VARCHAR(100),
  profile_picture_url VARCHAR(255),
  bio TEXT,
  favorite_bookie_id INTEGER REFERENCES bookies(id) ON DELETE SET NULL,
  total_bets INTEGER DEFAULT 0,
  total_profit DECIMAL(10,2) DEFAULT 0.00,
  roi DECIMAL(5,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_bookie_accounts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  bookie_id INTEGER REFERENCES bookies(id) ON DELETE CASCADE,
  initial_balance DECIMAL(10,2) NOT NULL,
  current_balance DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_bookies (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  bookie_id INTEGER REFERENCES bookies(id) ON DELETE CASCADE
);

CREATE TABLE userBets (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  sport_id INTEGER NOT NULL REFERENCES sports(id),
  sport_category VARCHAR(100),
  event_name VARCHAR(255),
  pick VARCHAR(200) NOT NULL,
  bettype VARCHAR(200) NOT NULL,
  odds DECIMAL(6,2) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  bet_units DECIMAL(5,2) DEFAULT NULL,
  result VARCHAR(200) NOT NULL DEFAULT 'pending',
  is_won BOOLEAN DEFAULT NULL,
  return DECIMAL(10,2),
  profit_loss DECIMAL(10,2),
  bet_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  bookie_id INTEGER NOT NULL REFERENCES bookies(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_bet_units_and_balance()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate bet units (percentage of the user's current balance)
  NEW.bet_units := (NEW.amount / 
    (SELECT current_balance 
     FROM user_bookie_accounts 
     WHERE user_id = NEW.user_id AND bookie_id = NEW.bookie_id)) * 100;

  -- Deduct the bet amount from the user's current balance
  UPDATE user_bookie_accounts
  SET current_balance = current_balance - NEW.amount,
      updated_at = CURRENT_TIMESTAMP
  WHERE user_id = NEW.user_id AND bookie_id = NEW.bookie_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_userBets
BEFORE INSERT ON userBets
FOR EACH ROW
EXECUTE FUNCTION update_bet_units_and_balance();

CREATE OR REPLACE FUNCTION settle_bet()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_won THEN
    UPDATE user_bookie_accounts
    SET current_balance = current_balance + NEW.return,
        updated_at = CURRENT_TIMESTAMP
    WHERE user_id = NEW.user_id AND bookie_id = NEW.bookie_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_update_userBets
AFTER UPDATE OF is_won ON userBets
FOR EACH ROW
EXECUTE FUNCTION settle_bet();

CREATE VIEW user_statistics AS
SELECT
  up.user_id,
  COUNT(ub.id) AS total_bets,
  COALESCE(SUM(ub.profit_loss), 0) AS total_profit,
  CASE
    WHEN COALESCE(SUM(ub.amount), 0) > 0 THEN
      (COALESCE(SUM(ub.profit_loss), 0) / SUM(ub.amount)) * 100
    ELSE 0
  END AS roi
FROM user_profiles up
LEFT JOIN userBets ub ON up.user_id = ub.user_id
GROUP BY up.user_id;



`
