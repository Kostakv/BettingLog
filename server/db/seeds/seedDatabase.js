module.exports = `
 
  INSERT INTO users (username,password,email,is_admin) VALUES (
    'MeShwamp','$2a$10$U35lMD9rB38wy/itPaVKWekIlKgFxQN.ujMfNAkQ1fOYpkc19OWqC','kostakv@Outlook.com','true');



-- Insert additional test users
INSERT INTO users (username, password, email, is_admin) VALUES
('BetMaster', '$2a$10$randomHashedPassword1', 'betmaster@example.com', false),
('SportsFanatic', '$2a$10$randomHashedPassword2', 'sportsfanatic@example.com', false),
('LuckyLuke', '$2a$10$randomHashedPassword3', 'luckyluke@example.com', false),
('ProPunter', '$2a$10$randomHashedPassword4', 'propunter@example.com', false);

-- Insert test bookies
INSERT INTO bookies (name, logo_url, website_url) VALUES
('DraftKings', 'https://example.com/dk_logo.png', 'https://draftkings.com'),
('FanDuel', 'https://example.com/fd_logo.png', 'https://fanduel.com'),
('BetMGM', 'https://example.com/mgm_logo.png', 'https://betmgm.com'),
('Caesars', 'https://example.com/caesars_logo.png', 'https://caesars.com'),
('PointsBet', 'https://example.com/pointsbet_logo.png', 'https://pointsbet.com');

-- Insert test sports
INSERT INTO sports (name) VALUES
('Soccer'),
('Basketball'),
('Football'),
('Tennis'),
('Hockey'),
('Baseball'),
('Golf'),
('Cricket'),
('Rugby'),
('Esports');

-- Assign initial balances to user-bookie accounts
INSERT INTO user_bookie_accounts (user_id, bookie_id, initial_balance, current_balance) VALUES
(1, 1, 500.00, 500.00), -- MeShwamp with DraftKings
(1, 2, 300.00, 250.00), -- MeShwamp with FanDuel
(2, 3, 1000.00, 800.00), -- BetMaster with BetMGM
(3, 4, 400.00, 450.00), -- SportsFanatic with Caesars
(4, 5, 700.00, 750.00); -- LuckyLuke with PointsBet

-- Assign bookies to users for tracking
INSERT INTO user_bookies (user_id, bookie_id) VALUES
(1, 1), -- MeShwamp with DraftKings
(1, 2), -- MeShwamp with FanDuel
(2, 3), -- BetMaster with BetMGM
(3, 4), -- SportsFanatic with Caesars
(4, 5); -- LuckyLuke with PointsBet

-- Insert test bets
INSERT INTO userBets (user_id, sport_id, sport_category, event_name, pick, bettype, odds, amount, result, is_won, return, profit_loss, bet_date, bookie_id, notes) VALUES
(1, 1, 'EPL', 'Liverpool vs. Man City', 'Liverpool +0.5', 'spread', 1.90, 100.00, 'won', true, 190.00, 90.00, '2023-12-01 15:00:00', 1, 'Great odds!'),
(1, 2, 'NBA', 'Lakers vs. Warriors', 'Lakers ML', 'moneyline', 2.10, 50.00, 'lost', false, 0.00, -50.00, '2023-12-02 20:00:00', 2, 'Close game'),
(2, 3, 'NFL', 'Patriots vs. Jets', 'Under 42.5', 'totals', 1.80, 200.00, 'pending', NULL, NULL, NULL, '2023-12-03 18:30:00', 3, NULL),
(3, 4, 'ATP', 'Nadal vs. Djokovic', 'Nadal -1.5', 'spread', 1.95, 150.00, 'won', true, 292.50, 142.50, '2023-12-04 14:00:00', 4, 'Epic match!'),
(4, 5, 'NHL', 'Maple Leafs vs. Bruins', 'Maple Leafs ML', 'moneyline', 2.20, 75.00, 'lost', false, 0.00, -75.00, '2023-12-05 19:30:00', 5, NULL),
(1, 6, 'MLB', 'Yankees vs. Red Sox', 'Yankees -1.5', 'spread', 1.85, 120.00, 'won', true, 222.00, 102.00, '2023-12-06 13:00:00', 1, 'Yankees dominated');

-- Additional test bets for a larger dataset
DO $$
DECLARE 
  i INT;
BEGIN
  FOR i IN 7..50 LOOP
    INSERT INTO userBets (user_id, sport_id, sport_category, event_name, pick, bettype, odds, amount, result, is_won, return, profit_loss, bet_date, bookie_id, notes) VALUES
    (1, (i % 10) + 1, 'Category ' || i, 'Event ' || i, 'Pick ' || i, 'Type ' || i, (random() * (2.50 - 1.50) + 1.50)::NUMERIC(6,2), (random() * (200 - 10) + 10)::NUMERIC(10,2), 'pending', NULL, NULL, NULL, NOW() - (i || ' days')::INTERVAL, (i % 5) + 1, 'Test bet ' || i);
  END LOOP;
END $$;`