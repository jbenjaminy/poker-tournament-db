create table if not exists casinos (
	id serial primary key,
	name text not null unique,
	place_id text,
	address text,
	state text,
	phone text,
	website text,
	hours text,
	has_poker Boolean,
	games_offered text,
	description text,
	specials text,
	poker_url text
);

create table if not exists tournaments (
	id serial primary key,
	casino_id integer not null references casinos,
	name text,
	day text,
	tourney_start text,
	reg_start text,
	reg_end text,
	game text,
	buyin text,
	rebuy text,
	add_on text,
	bounty text,
	prize_gtd text,
	other text
);