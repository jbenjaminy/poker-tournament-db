/* --------- DATABASE CONNECTION ---------- */
var databaseUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/pokerTournaments';
if (process.env.NODE_ENV === 'production') {
    databaseUrl += '?ssl=true';
}

var knex = require('knex')({
    client: 'pg',
    connection: databaseUrl
});

module.exports = knex;