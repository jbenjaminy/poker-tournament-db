create table if not exists casinos (
	id serial primary key,
	name text not null unique,
	place_id text,
	address text,
	state text,
	phone text,
	website text,
	hours text,
	-- add has_slots, has_blackjack, etc.
	has_poker Boolean,
	games_offered text,
	description text,
	specials text,
	poker_url text,
	calendar_url text
);

create table if not exists tournaments (
	id serial primary key,
	-- TODO: find out if you can link by name
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
	reentry text,
	prize_gtd text,
	other text
);