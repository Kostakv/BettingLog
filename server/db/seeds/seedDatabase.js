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
(1, 1, 1000.00, 1000.00),
(1, 2, 1000.00, 1000.00),
(1, 3, 1000.00, 1000.00);

INSERT INTO userbets (user_id, sport_id, sport_category, event_name, pick, bettype, odds, amount, result, is_won, return, profit_loss, bookie_id) VALUES
(1, 1, 'Soccer', 'World Cup Final 2025', 'Brazil to Win', 'Moneyline', 2.50, 50.00, 'won', true, 125.00, 75.00, 1),
(1, 2, 'Basketball', 'NBA Finals Game 5', 'Lakers +5.5', 'Spread', 1.90, 30.00, 'lost', false, 0.00, -30.00, 2),
(1, 3, 'Football', 'Super Bowl 2025', 'Kansas City Chiefs vs. San Francisco 49ers - Over 49.5', 'Over/Under', 1.80, 40.00, 'won', true, 72.00, 32.00, 3),
(1, 4, 'Tennis', 'Wimbledon Men''s Final', 'Roger Federer', 'Moneyline', 2.00, 25.00, 'won', true, 50.00, 25.00, 1),
(1, 5, 'Hockey', 'Stanley Cup Finals', 'Edmonton Oilers -1.5', 'Puck Line', 2.20, 35.00, 'lost', false, 0.00, -35.00, 2),
(1, 1, 'Soccer', 'Premier League Match', 'Liverpool vs. Man City - Draw', '3-Way Moneyline', 3.40, 20.00, 'won', true, 68.00, 48.00, 3),
(1, 6, 'CS2', 'ESL Pro League Finals', 'Team Liquid', 'Moneyline', 1.75, 50.00, 'won', true, 87.50, 37.50, 1),
(1, 7, 'Cricket', 'ICC World Cup', 'India vs. Australia - India', 'Match Winner', 1.60, 40.00, 'won', true, 64.00, 24.00, 2),
(1, 8, 'Baseball', 'World Series', 'Yankees vs. Dodgers - Over 7.5 Runs', 'Over/Under', 1.85, 30.00, 'lost', false, 0.00, -30.00, 3),
(1, 9, 'Volleyball', 'Olympic Finals', 'USA vs. Brazil - USA', 'Match Winner', 2.10, 25.00, 'won', true, 52.50, 27.50, 1),
(1, 10, 'Darts', 'PDC World Championship', 'Michael van Gerwen', 'Moneyline', 2.30, 20.00, 'lost', false, 0.00, -20.00, 2),
(1, 2, 'Basketball', 'NCAA March Madness', 'Duke -3.5', 'Spread', 1.95, 35.00, 'won', true, 68.25, 33.25, 3),
(1, 3, 'Football', 'College Football Playoff', 'Alabama vs. Clemson - Under 55.5', 'Over/Under', 1.90, 30.00, 'won', true, 57.00, 27.00, 1),
(1, 4, 'Tennis', 'US Open Women''s Final', 'Serena Williams', 'Moneyline', 1.80, 25.00, 'lost', false, 0.00, -25.00, 2),
(1, 5, 'Hockey', 'NHL Regular Season', 'Toronto Maple Leafs vs. Boston Bruins - Over 5.5', 'Over/Under', 1.75, 40.00, 'won', true, 70.00, 30.00, 3),
(1, 1, 'Soccer', 'Champions League', 'Real Madrid vs. Barcelona - Barcelona', 'Moneyline', 2.75, 30.00, 'lost', false, 0.00, -30.00, 1),
(1, 6, 'CS2', 'DreamHack Open', 'Fnatic', 'Moneyline', 2.00, 50.00, 'won', true, 100.00, 50.00, 2),
(1, 7, 'Cricket', 'T20 World Cup', 'England vs. Pakistan - England', 'Match Winner', 1.90, 45.00, 'won', true, 85.50, 40.50, 3),
(1, 8, 'Baseball', 'ALCS', 'Astros vs. Rangers - Astros', 'Moneyline', 1.65, 35.00, 'won', true, 57.75, 22.75, 1),
(1, 9, 'Volleyball', 'World Championships', 'Poland vs. Italy - Poland', 'Match Winner', 1.80, 20.00, 'lost', false, 0.00, -20.00, 2);
`;


