const { Client } = require('pg');
const { faker } = require('@faker-js/faker');

// Set the locale to English
faker.locale = 'en';

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'betlog',
  password: 'password',
  port: 5432,
});

const generateTestData = async () => {
  try {
    await client.connect();

    // Generate test data for user_bookie_accounts
    const userId = 1; // Assuming user ID 1 for test data
    const bookieIds = [1, 2, 3]; // Assuming these bookie IDs exist
    const initialBalances = [1000.00, 1500.00, 800.00];
    const currentBalances = [900.00, 1400.00, 700.00];

    for (let i = 0; i < bookieIds.length; i++) {
      // Check if the record already exists
      const { rows } = await client.query(
        `SELECT * FROM user_bookie_accounts WHERE user_id = $1 AND bookie_id = $2`,
        [userId, bookieIds[i]]
      );

      if (rows.length === 0) {
        // Insert the record if it does not exist
        await client.query(
          `INSERT INTO user_bookie_accounts (user_id, bookie_id, initial_balance, current_balance)
           VALUES ($1, $2, $3, $4)`,
          [userId, bookieIds[i], initialBalances[i], currentBalances[i]]
        );
      } else {
        console.log(`Record for user_id ${userId} and bookie_id ${bookieIds[i]} already exists.`);
      }
    }

    // Predefined lists of sports teams and events
    const sportsTeams = {
      Soccer: ['Manchester United', 'Arsenal', 'Chelsea', 'Liverpool', 'Manchester City'],
      Basketball: ['Lakers', 'Celtics', 'Warriors', 'Bulls', 'Heat'],
      Football: ['Patriots', 'Rams', 'Cowboys', 'Packers', 'Steelers'],
      Tennis: ['Federer', 'Nadal', 'Djokovic', 'Murray', 'Thiem'],
      Hockey: ['Maple Leafs', 'Canadiens', 'Bruins', 'Rangers', 'Blackhawks'],
      Baseball: ['Yankees', 'Red Sox', 'Dodgers', 'Cubs', 'Giants'],
      Cricket: ['India', 'Australia', 'England', 'South Africa', 'New Zealand'],
      Volleyball: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      Darts: ['Player A', 'Player B', 'Player C', 'Player D', 'Player E'],
      CS2: ['Team X', 'Team Y', 'Team Z', 'Team W', 'Team V']
    };

    const sportIds = {
      Soccer: 1,
      Basketball: 2,
      Football: 3,
      Tennis: 4,
      Hockey: 5,
      Baseball: 6,
      Cricket: 7,
      Volleyball: 8,
      Darts: 9,
      CS2: 10
    };

    const betTypes = ['Moneyline', 'Spread Betting', 'Over/Under'];
    const results = ['won', 'lost', 'pending'];
    const isWon = [true, false, null];

    for (let i = 0; i < 20; i++) {
      const sportCategory = faker.helpers.arrayElement(Object.keys(sportsTeams));
      const sportId = sportIds[sportCategory];
      const teams = sportsTeams[sportCategory];
      const homeTeam = faker.helpers.arrayElement(teams);
      let awayTeam;
      do {
        awayTeam = faker.helpers.arrayElement(teams);
      } while (awayTeam === homeTeam);

      const eventName = `${homeTeam} vs. ${awayTeam}`;
      const pick = faker.helpers.arrayElement([homeTeam, awayTeam]);
      const betType = faker.helpers.arrayElement(betTypes);
      const odds = faker.finance.amount(1.01, 10.00, 2); // Realistic decimal odds
      const amount = faker.finance.amount(10, 200, 2); // Realistic bet amount
      const betUnits = (amount / faker.helpers.arrayElement(currentBalances)) * 100;
      const result = faker.helpers.arrayElement(results);
      const won = result === 'won' ? true : result === 'lost' ? false : null;
      const returnAmount = won ? amount * odds : 0;
      const profitLoss = won ? returnAmount - amount : -amount;
      const betDate = faker.date.recent();
      const bookieId = faker.helpers.arrayElement(bookieIds);
      const notes = `Bet on ${pick} to win ${eventName}`; // More relevant notes

      await client.query(
        `INSERT INTO userBets (user_id, sport_id, sport_category, event_name, pick, bettype, odds, amount, bet_units, result, is_won, return, profit_loss, bet_date, bookie_id, notes)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
        [userId, sportId, sportCategory, eventName, pick, betType, odds, amount, betUnits, result, won, returnAmount, profitLoss, betDate, bookieId, notes]
      );

      // Update the current balance of the bookie account
      await client.query(
        `UPDATE user_bookie_accounts
         SET current_balance = current_balance - $1 + $2
         WHERE user_id = $3 AND bookie_id = $4`,
        [amount, returnAmount, userId, bookieId]
      );
    }

    console.log('Test data generated successfully.');
  } catch (error) {
    console.error('Error generating test data:', error);
  } finally {
    await client.end();
  }
};

generateTestData();