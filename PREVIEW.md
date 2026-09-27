# Poker Tournament DB — local UI preview

## Quick UI preview (no Postgres)

```bash
cd /workspace/poker-tournament-db
npm install --legacy-peer-deps   # Node 20 works; engines pin is historical
npm run build
npm run preview                  # or: node mock-server.js
```

Open: **http://localhost:8080/allcasinos**

`mock-server.js` serves `./build` and answers `/casinos` + tournament routes from
`other/casino-obj-array.js` / `other/tourney-obj-array.js` (in memory).

## Full stack (Postgres)

```bash
# requires local Postgres
createdb pokerTournaments
psql -d pokerTournaments < backend/pg/schema.sql
# seed via POST /casinos and POST /tournaments (see README.MD) using other/*-obj-array.js
npm run build
npm start                        # node server.js → http://localhost:8080
```

Set `DATABASE_URL` if not using `postgres://localhost:5432/pokerTournaments`.

## UI refresh notes

- Dark felt-green / gold casino aesthetic in `css/index.less`
- Full-page background: `css/images/poker-chips-bg.png` (copied to `build/images/` on build)
- Soft dark gradient overlay keeps text readable
