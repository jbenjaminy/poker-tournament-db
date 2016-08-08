## TODO:
1) Do API call from place-id-array
Google places, get details:

	endpoint: https://maps.googleapis.com/maps/api/place/details/json?

	required params:
		placeid: ChIJRQ5dKFi2woARBYMGje10qsw& (example)
		key: AIzaSyDm71dLA-nxg3KI4eSUYrAh8V5lp_gOoZI

	https://developers.google.com/places/place-id

2) Parse objects for name, address, phone number, website, hours etc.

3) Add to a postgreSQL db with casinos and tournaments defined in schema.sql

4) Add tournament info to mongodb with model tournaments.js

5) Make UI with React 
-real time search
	-can search by casino name, city, or state
	(need array with objects in format name-city-state)
	-returns casino info w/schedule (fetch API CALL TO DB)
-Advanced search
	-can search by city, state, day, game, buy-in
-React router used for routes to poker casinos/all casinos, casino details, and tournament info

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