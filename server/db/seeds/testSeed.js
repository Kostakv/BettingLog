module.exports = `-- Clear existing data
TRUNCATE TABLE userbets, user_bookie_accounts, bookies, users, sports RESTART IDENTITY CASCADE;

-- Insert user
INSERT INTO users (username, email, password, is_admin, is_profile_set_up) 
VALUES
('MeShwamp', 'kostakv@Outlook.com', '$2a$10$U35lMD9rB38wy/itPaVKWekIlKgFxQN.ujMfNAkQ1fOYpkc19OWqC', true, true);

-- Insert bookies
INSERT INTO bookies (name, logo_url, website_url) 
VALUES
('Betway', 'https://example.com/betway-logo.png', 'https://www.betway.com');

-- Insert sports
INSERT INTO sports (name, icon_url) VALUES
('Soccer', 'https://cdn-icons-png.flaticon.com/512/53/53283.png');

-- Insert user bookie account
INSERT INTO user_bookie_accounts (user_id, bookie_id, initial_balance, current_balance)
VALUES
(1, 1, 1000.00, 1000.00);

-- Insert userBets
INSERT INTO userbets (user_id, sport_id, bookie_id, event_name, pick, bettype, odds, amount, result, is_won, return, profit_loss) VALUES
(1, 1, 1, 'Premier League Match Day', 'Manchester City', 'Moneyline', 1.80, 50.00, 'won', true, 90.00, 40.00),
(1, 1, 1, 'NBA Finals Game 4', 'Golden State Warriors', 'Spread -5.5', 2.00, 30.00, 'lost', false, 0.00, -30.00),
(1, 1, 1, 'Super Bowl LVIII', 'Kansas City Chiefs', 'Over 48.5', 1.90, 40.00, 'won', true, 76.00, 36.00),
(1, 1, 1, 'Wimbledon Final', 'Djokovic', 'Match Winner', 2.10, 20.00, 'won', true, 42.00, 22.00),
(1, 1, 1, 'Stanley Cup Game 7', 'Boston Bruins', 'Under 5.5 Goals', 1.75, 25.00, 'lost', false, 0.00, -25.00);

`;
