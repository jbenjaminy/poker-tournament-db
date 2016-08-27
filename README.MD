## TO RUN APP:

1) Clone git repository:
	`git clone https://github.com/jbenjaminy/poker-tournament-db.git`

2) Install dependencies:
	`npm install`

3) Create build:
	`npm run build`

4) Create database:
	`createdb pokerTournaments`
	`psql -d pokerTournaments < backend/schema.sql`

5) Launch backend server:
	`npm run server`

6) Insert casinos into db:
	-Using postman, make a post request to the endpoint localhost:8081/casinos.
	-Copy and paste array from poker-tournament-db/other/casino-obj-array.json to the body of the request.
	-Make sure format is set to 'JSON'.

7) Insert tournaments into db:
	-Repeat step 6, this time making post request to the endpoint localhost:8081/tournaments, using the array from poker-tournament-db/other/tourney-obj-array.json in the body.

8) Run frontend server:
	`npm run dev`

9) View site at: 
	http://localhost:8080/webpack-dev-server/

## TODO:
1) Finish adding tournament information and updating casino information.

2) Make search output clear when you clear input box/go back from a casino page/switch between search catagories.

3) Add react-router-scroll

4) Additional styling. 

BACKEND:
## Setting up the database and backend server.

	1. Install postgreSQL using homebrew:
			$ brew install postgresql

	2. Install postgreSQL node-module using NPM:
			$ npm install --save pg

	3. Launch postgreSQL using homebrew:
			$ brew services start postgresql

	4. In project directory, create new db:
			$ createdb *INSERT_DB_NAME*

	5. Connect model tables (schema.sql) db:
			$ psql -d *INSERT_DB_NAME* < *INSERT_SCHEMA.SQL_PATH*

	6. Access database:
			$ psql -d *INSERT_DB_NAME*


## Queries for accessing the SQL database directly.

	Query examples:
		-CREATE:
			$ insert into *INSERT_TABLE* (*INSERT_COLUMN_1*, *INSERT_COLUMN_2*) values ('*INSERT_VALUE_1*', '*INSERT_VALUE_2*');
		-READ:
			$ select * from *INSERT_TABLE*;
			$ select *INSERT_VALUE from *INSERT_TABLE*;
			$ select *INSERT_COLUMN_1*, *INSERT_COLUMN_2* from *INSERT_TABLE* where *INSERT_COLUMN_1*='*INSERT_VALUE_1*';
		-UPDATE:
			$ update *INSERT_TABLE* set *INSERT_COLUMN_1*='*INSERT_VALUE_1*' where *INSERT_VALUE_2*='*INSERT_COLUMN_2*';
		-DELETE:
			$ delete from *INSERT_TABLE* where *INSERT_COLUMN_1*='*INSERT_VALUE_1*';

## Google places:
	Get details:

	endpoint: https://maps.googleapis.com/maps/api/place/details/json?

	required params:
		placeid: ChIJRQ5dKFi2woARBYMGje10qsw& (example)
		key: AIzaSyDm71dLA-nxg3KI4eSUYrAh8V5lp_gOoZI

	https://developers.google.com/places/place-id