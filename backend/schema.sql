create table if not exists casinos (
	id serial primary key,
	name text not null unique,
	placeId text,
	address text,
	phone text,
	website text,
	-- hours text,
	hasPoker text
	-- gamesOffered text,
	-- other text
);

create table if not exists tournaments (
	id serial primary key,
	casino_id integer not null references casinos,
	name text,
	day text,
	tourneyStart text,
	regStart text,
	regEnd text,
	game text,
	buyin text,
	rebuy text,
	addOn text,
	bounty text,
	prizeGtd text,
	other text
);