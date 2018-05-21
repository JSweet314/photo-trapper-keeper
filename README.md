# Photo Trapper Keeper

## Instructions:
1. Clone this repo
```
git clone https://github.com/JSweet314/photo-trapper-keeper.git
```

2. Change in to the project directory and install dependencies
```
cd photo-trapper-keeper && npm install
```

3. Create the postgreSQL databases
```
psql
CREATE DATABASE photo_trapper;
CREATE DATABASE photo_trapper_test;
```

4. Run the database migrations and seed the databse
```
knex migrate:latest
knex seed:run
```

5. Start the server
```
npm start 
```

6. Visit the app in your browser at `localhost:3000`