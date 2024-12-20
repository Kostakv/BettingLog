# Back-end database for BettingLog

## This project uses PSQL 

### To start it up yourself follow these next steps.

1. Download and install postgresql ---> https://www.postgresql.org/download/
2. Create a database in PSQL
3. Fork and clone repo. Once that is done open the server folder and create a .env file.  

.env file has to contain these properties
```
PGHOST=localhost
PGUSER=postgres
PGDATABASE=betlog
PGPASSWORD=password
PGPORT=5432
PORT=7000
```


To run the server

```
npm run dev
```

To reset the database 

```
npm run db:reset
```