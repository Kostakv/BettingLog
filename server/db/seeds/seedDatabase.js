module.exports = `
 
  INSERT INTO users (username,password,email,is_admin) VALUES (
    'MeShwamp','$2a$10$U35lMD9rB38wy/itPaVKWekIlKgFxQN.ujMfNAkQ1fOYpkc19OWqC','kostakv@Outlook.com','true');





  INSERT INTO userBets (user_id,sport,pick,bettype,odds,amount,book,result,return) VALUES (
    '1',
    'CS:GO',
    'ENCE',
    'Spread',
    '1.95',
    '12',
    'Bet365',
    'win',
    '23.4'
  );

  INSERT INTO userBets (user_id,sport,pick,bettype,odds,amount,book,result,return) VALUES (
    '1',
    'CS:GO',
    'NAVI',
    'Spread',
    '1.78',
    '10',
    'Bet365',
    'win',
    '17.8'
  );

  INSERT INTO userBets (user_id,sport,pick,bettype,odds,amount,book,result,return) VALUES (
    '1',
    'CS:GO',
    'Gambit',
    'Spread',
    '1.95',
    '15',
    'Bet365',
    'win',
    '29.25'
  );

  INSERT INTO userBets (user_id,sport,pick,bettype,odds,amount,book,result,return) VALUES (
    '1',
    'CS:GO',
    'Gambit',
    'Spread',
    '1.95',
    '10',
    'Bet365',
    'loss',
    '0'
  );


  INSERT INTO userBets (user_id,sport,pick,bettype,odds,amount,book,result,return) VALUES (
    '1',
    'CS:GO',
    'MOUZ',
    'Spread',
    '1.80',
    '5',
    'Bet365',
    'win',
    '9'
  );


  INSERT INTO userBets (user_id,sport,pick,bettype,odds,amount,book,result,return) VALUES (
    '1',
    'CS:GO',
    'Spirit',
    'Spread',
    '2.15',
    '15',
    'Bet365',
    'win',
    '32.25'
  );


  INSERT INTO userBets (user_id,sport,pick,bettype,odds,amount,book,result,return) VALUES (
    '1',
    'CS:GO',
    'Liquid',
    'Spread',
    '1.95',
    '8',
    'Bet365',
    'loss',
    '0'
  );


  INSERT INTO userBets (user_id,sport,pick,bettype,odds,amount,book,result,return) VALUES (
    '1',
    'CS:GO',
    'NAVI',
    'Spread',
    '1.65',
    '8.50',
    'Bet365',
    'win',
    '14'
  );


  INSERT INTO userBets (user_id,sport,pick,bettype,odds,amount,book,result,return) VALUES (
    '1',
    'CS:GO',
    'OG',
    'Spread',
    '2.75',
    '3.50',
    'Bet365',
    'loss',
    '0'
  );

`;