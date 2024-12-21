module.exports = `
-- Insert users
INSERT INTO users (username, password, email, is_admin) VALUES
('MeShwamp', '$2a$10$U35lMD9rB38wy/itPaVKWekIlKgFxQN.ujMfNAkQ1fOYpkc19OWqC', 'kostakv@Outlook.com', true),
('BetMaster', '$2a$10$randomHashedPassword1', 'betmaster@example.com', false),
('SportsFanatic', '$2a$10$randomHashedPassword2', 'sportsfanatic@example.com', false),
('LuckyLuke', '$2a$10$randomHashedPassword3', 'luckyluke@example.com', false),
('ProPunter', '$2a$10$randomHashedPassword4', 'propunter@example.com', false);

-- Insert bookies
INSERT INTO bookies (name, logo_url, website_url) VALUES
('DraftKings', 'https://example.com/dk_logo.png', 'https://draftkings.com'),
('FanDuel', 'https://example.com/fd_logo.png', 'https://fanduel.com'),
('BetMGM', 'https://example.com/mgm_logo.png', 'https://betmgm.com'),
('Caesars', 'https://example.com/caesars_logo.png', 'https://caesars.com'),
('PointsBet', 'https://example.com/pointsbet_logo.png', 'https://pointsbet.com');

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

-- Insert user profiles
INSERT INTO user_profiles (user_id, location, favorite_sport, preferred_bet_type, bio) VALUES
(1, 'Toronto, Canada', 'Soccer', 'Spread', 'Big fan of Premier League'),
(2, 'Los Angeles, USA', 'Basketball', 'Moneyline', 'Love NBA playoffs'),
(3, 'New York, USA', 'Football', 'Totals', 'NFL Sundays are my jam'),
(4, 'Chicago, USA', 'Baseball', 'Spread', 'MLB analytics lover'),
(5, 'Miami, USA', 'Hockey', 'Moneyline', 'Go Panthers!');

-- Insert user-bookie accounts with initial and current balances
INSERT INTO user_bookie_accounts (user_id, bookie_id, initial_balance, current_balance) VALUES
(1, 1, 500.00, 500.00), -- MeShwamp with DraftKings
(1, 2, 300.00, 300.00), -- MeShwamp with FanDuel
(2, 3, 1000.00, 800.00), -- BetMaster with BetMGM
(3, 4, 400.00, 400.00), -- SportsFanatic with Caesars
(4, 5, 700.00, 700.00); -- LuckyLuke with PointsBet


-- Assign user-bookies relationships
INSERT INTO user_bookies (user_id, bookie_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 1);

-- Insert bets for users
INSERT INTO userBets (user_id, sport_id, sport_category, event_name, pick, bettype, odds, amount, result, is_won, return, profit_loss, bookie_id, notes) VALUES
-- Bet 1: Won
(1, 1, 'Premier League', 'Chelsea vs Arsenal', 'Chelsea +1.0', 'Spread', 1.85, 50.00, 'won', true, 92.50, 42.50, 1, 'Chelsea played exceptionally well'),
-- Bet 2: Lost
(1, 2, 'NBA', 'Lakers vs Celtics', 'Lakers', 'Moneyline', 2.00, 30.00, 'lost', false, 0.00, -30.00, 2, 'Lakers struggled in the 4th quarter'),
-- Bet 3: Won
(1, 3, 'NFL', 'Packers vs Bears', 'Over 48.5', 'Totals', 1.90, 75.00, 'won', true, 142.50, 67.50, 1, 'High-scoring shootout'),
-- Bet 4: Lost
(1, 4, 'ATP', 'Federer vs Nadal', 'Federer', 'Moneyline', 2.50, 50.00, 'lost', false, 0.00, -50.00, 2, 'Federer couldn’t handle Nadal’s forehand'),
-- Bet 5: Won
(1, 5, 'NHL', 'Bruins vs Maple Leafs', 'Bruins', 'Moneyline', 1.75, 40.00, 'won', true, 70.00, 30.00, 1, 'Bruins dominated the game'),
-- Bet 6: Won
(1, 6, 'MLB', 'Yankees vs Red Sox', 'Over 9.5', 'Totals', 2.10, 60.00, 'won', true, 126.00, 66.00, 2, 'High-scoring game anticipated'),
-- Bet 7: Lost
(1, 7, 'Cricket', 'India vs Australia', 'India', 'Moneyline', 2.15, 100.00, 'lost', false, 0.00, -100.00, 1, 'Unexpected batting collapse'),
-- Bet 8: Won
(1, 8, 'Rugby', 'England vs New Zealand', 'New Zealand -3.5', 'Spread', 1.90, 90.00, 'won', true, 171.00, 81.00, 2, 'New Zealand held strong throughout'),
-- Bet 9: Won
(1, 9, 'Esports', 'Team A vs Team B', 'Team B', 'Moneyline', 1.65, 60.00, 'won', true, 99.00, 39.00, 1, 'Team B dominated the map'),
-- Bet 10: Lost
(1, 10, 'Soccer', 'PSG vs Bayern', 'PSG +0.5', 'Spread', 1.88, 50.00, 'lost', false, 0.00, -50.00, 2, 'Missed opportunities for PSG');





;
`;
