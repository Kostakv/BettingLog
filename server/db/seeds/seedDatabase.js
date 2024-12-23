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
(1, 1, 1000.00, 1000.00);

-- Insert userbets with net_gain_loss
INSERT INTO userbets (user_id, sport_id, bookie_id, event_name, pick, bettype, odds, amount, result, is_won, return, profit_loss, net_gain_loss) VALUES
(1, 1, 1, 'Premier League Match Day', 'Manchester City', 'Moneyline', 1.80, 50.00, 'won', true, 90.00, 40.00, 40.00),
(1, 1, 1, 'NBA Finals Game 4', 'Golden State Warriors', 'Spread -5.5', 2.00, 30.00, 'lost', false, 0.00, -30.00, -30.00),
(1, 1, 1, 'Super Bowl LVIII', 'Kansas City Chiefs', 'Over 48.5', 1.90, 40.00, 'won', true, 76.00, 36.00, 36.00),
(1, 1, 1, 'Wimbledon Final', 'Djokovic', 'Match Winner', 2.10, 20.00, 'won', true, 42.00, 22.00, 22.00),
(1, 1, 1, 'Stanley Cup Game 7', 'Boston Bruins', 'Under 5.5 Goals', 1.75, 25.00, 'lost', false, 0.00, -25.00, -25.00);
`;


