create table if not exists casinos (
	name text not null unique primary key,
	id serial,
	place_id text,
	address text,
	state text,
	phone text,
	website text,
	hours text,
	other_games text,
	has_poker Boolean,
	poker_tournaments Boolean,
	games_offered text,
	description text,
	specials text,
	poker_promotions text,
	poker_url text,
	calendar_url text
);

create table if not exists tournaments (
	id serial primary key,
	casino_name text not null references casinos,
	name text,
	day text,
	tourney_start text,
	reg_start text,
	reg_end text,
	game text,
	buyin text,
	starting_chips text,
	rebuy text,
	add_on text,
	bounty text,
	re_entry text,
	prize_gtd text,
	other text
);