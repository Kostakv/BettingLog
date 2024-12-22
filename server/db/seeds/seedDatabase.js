module.exports = `-- Insert user with profile set up
INSERT INTO users (username, password, email, is_admin, is_profile_set_up) 
VALUES
('MeShwamp', '$2a$10$U35lMD9rB38wy/itPaVKWekIlKgFxQN.ujMfNAkQ1fOYpkc19OWqC', 'kostakv@Outlook.com', true, true);

-- Insert bookies
INSERT INTO bookies (name, logo_url, website_url) 
VALUES
('Betway', 'https://example.com/betway-logo.png', 'https://www.betway.com'),
('DraftKings', 'https://example.com/draftkings-logo.png', 'https://www.draftkings.com'),
('FanDuel', 'https://example.com/fanduel-logo.png', 'https://www.fanduel.com');

-- Insert sports
INSERT INTO sports (name, icon_url) VALUES
('Soccer', 'https://cdn-icons-png.flaticon.com/512/53/53283.png'),
('Basketball', 'https://icons.iconarchive.com/icons/icons8/ios7/256/Sports-Basketball-icon.png'),
('Football', 'https://cdn1.iconfinder.com/data/icons/sports-ball-outline/64/Sports_ball_icon_Set_-_outline-07-512.png'),
('Tennis', 'https://cdn-icons-png.flaticon.com/512/8/8331.png'),
('Hockey', 'https://loodibee.com/wp-content/uploads/NHL-league-logo.png'),
('CS2', 'https://seeklogo.com/images/C/Counter-Strike-logo-EAC70C9C3A-seeklogo.com.png'),
('Cricket', 'https://i.imgflip.com/1sqkm8.jpg'),
('Baseball', 'https://cdn-icons-png.flaticon.com/512/4329/4329276.png'),
('Volleyball', 'https://www.freeiconspng.com/uploads/volleyball-icon-ball-0.png'),
('Darts', 'https://cdn-icons-png.flaticon.com/512/69/69717.png');

-- Insert user profile
INSERT INTO user_profiles (user_id, location, favorite_sport)
VALUES
(1, 'Toronto, Canada', 'Basketball');

-- Insert user bookie accounts
INSERT INTO user_bookie_accounts (user_id, bookie_id, initial_balance, current_balance)
VALUES
(1, 1, 1000.00, 900.00), -- Betway
(1, 2, 1500.00, 1400.00), -- DraftKings
(1, 3, 800.00, 700.00); -- FanDuel

-- Insert 20 userBets and adjust bookie balances
-- Example bets:

-- Bet 1
INSERT INTO userBets (user_id, sport_id, sport_category, event_name, pick, bettype, odds, amount, bet_units, result, is_won, return, profit_loss, bet_date, bookie_id, notes)
VALUES (1, 1, 'Premier League', 'Manchester United vs. Arsenal', 'Manchester United ML', 'Moneyline', 2.1, 50.00, 5.56, 'won', true, 105.00, 55.00, CURRENT_TIMESTAMP, 1, 'Great match for Manchester United.');
UPDATE user_bookie_accounts SET current_balance = current_balance - 50.00 + 105.00 WHERE user_id = 1 AND bookie_id = 1;

-- Bet 2
INSERT INTO userBets (user_id, sport_id, sport_category, event_name, pick, bettype, odds, amount, bet_units, result, is_won, return, profit_loss, bet_date, bookie_id, notes)
VALUES (1, 2, 'NBA', 'Lakers vs. Celtics', 'Lakers +5', 'Spread Betting', 1.9, 80.00, 8.89, 'lost', false, 0.00, -80.00, CURRENT_TIMESTAMP, 2, 'Tough loss for the Lakers.');
UPDATE user_bookie_accounts SET current_balance = current_balance - 80.00 WHERE user_id = 1 AND bookie_id = 2;

-- Repeat similar structure for Bets 3–20:
-- Ensure variety of sports, bookies, results (won/lost), and balance updates.
-- Each bet should update the corresponding bookie balance after the INSERT.

-- Final bet (Bet 20 example):
INSERT INTO userBets (user_id, sport_id, sport_category, event_name, pick, bettype, odds, amount, bet_units, result, is_won, return, profit_loss, bet_date, bookie_id, notes)
VALUES (1, 10, 'World Darts Championship', 'Player A vs. Player B', 'Player A ML', 'Moneyline', 1.75, 120.00, 10.00, 'won', true, 210.00, 90.00, CURRENT_TIMESTAMP, 3, 'Fantastic performance by Player A.');
UPDATE user_bookie_accounts SET current_balance = current_balance - 120.00 + 210.00 WHERE user_id = 1 AND bookie_id = 3;

-- Ensure all 20 bets are included following this structure, with corresponding updates to bookie balances.


`;
