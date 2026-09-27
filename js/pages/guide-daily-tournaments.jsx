var React = require('react');
var router = require('react-router');
var Link = router.Link;

var PAGE_TITLE = 'How Daily Casino Poker Tournaments Work | Daily Tourneys';

var GuideDailyTournaments = React.createClass({
  componentDidMount: function() {
    document.title = PAGE_TITLE;
  },
  componentWillUnmount: function() {
    document.title = 'Daily Tourneys | U.S. Casino & Poker Room Tournament Schedules';
  },
  render: function() {
    return (
      <article className="content-page guide-page">
        <div className="detail-toolbar">
          <Link to="/allcasinos" className="back-link">← Back to search</Link>
        </div>
        <h1 className="content-h1">How daily casino poker tournaments work</h1>
        <p className="content-lead">
          Daily casino tournaments (“dailies”) are regular, usually low-to-mid buy-in events that run on a fixed weekly calendar.
          They are the backbone of most U.S. poker-room schedules — easier to plan around than one-off series, and a common path into larger events.
        </p>

        <section className="guide-section">
          <h2>What a daily is</h2>
          <p>
            A daily is a tournament that appears on a room’s recurring schedule — often every day, or on the same weekday each week.
            Unlike major festival events, dailies are designed for regulars and visitors alike: shorter time commitments, familiar structures,
            and buy-ins that fit a session rather than a vacation budget. Many rooms stack several dailies (afternoon, evening, late-night)
            so you can pick a start time that fits.
          </p>
          <p>
            You’ll still see the same tournament vocabulary as bigger events — freezeout, re-entry, bounty, turbo — just dialed to a smaller field
            and a tighter clock. See our <Link to="/guides/tournament-terms">tournament terms glossary</Link> for definitions.
          </p>
        </section>

        <section className="guide-section">
          <h2>Buy-ins</h2>
          <p>
            The buy-in is what you pay to enter. Casinos typically quote a total that includes the prize-pool portion plus a house fee (rake or admin).
            Example: a “$100 + $20” listing means $100 builds the prize pool and $20 goes to the house. Some rooms list a single number that already
            includes fees — check the schedule notes.
          </p>
          <p>
            Daily buy-ins commonly range from roughly $40–$150 for soft evening games, with bigger weekend or midweek “majors” at $200–$500+.
            Guaranteed prize pools (GTD) mean the room tops up the pool if entries fall short of a posted amount — useful when comparing value across rooms.
          </p>
        </section>

        <section className="guide-section">
          <h2>Structures</h2>
          <p>
            Structure is how chips and blinds escalate over time. Key pieces you’ll see on a schedule:
          </p>
          <ul className="guide-list">
            <li><strong>Starting stack</strong> — chips you begin with (e.g. 10,000–30,000). Deeper stacks usually mean longer play.</li>
            <li><strong>Blind levels</strong> — how long each blind step lasts (e.g. 20 or 30 minutes). Shorter levels = faster tournament (“turbo”).</li>
            <li><strong>Registration window</strong> — when you can still enter or re-enter. Late reg often closes a few levels after the start.</li>
            <li><strong>Rebuy / re-entry / addon</strong> — ways to get more chips. Freezeouts allow one bullet; re-entry events let you buy back in if you bust during reg.</li>
            <li><strong>Bounty / PKO</strong> — part of the prize is tied to eliminating other players.</li>
          </ul>
          <p>
            Reading those fields together tells you whether a daily is a deep grind or a short turbo — and whether one buy-in is enough or you’ll want a backup.
          </p>
        </section>

        <section className="guide-section">
          <h2>How to use this site</h2>
          <p>
            Daily Tourneys lists U.S. casino and card-room schedules in one place. Search by room name or city, open a room for contact and poker details,
            then view tournament info for days, start times, games, and buy-ins.
          </p>
          <p>
            Start with a city hub if you already know where you’re playing, or jump straight to search:
          </p>
          <p className="content-cta content-cta-block">
            <Link to="/allcasinos" className="cta-button">Search tournament schedules</Link>
          </p>
          <p className="content-cta">
            Or browse hubs: <Link to="/hubs/las-vegas-poker-rooms">Las Vegas</Link>
            {' · '}
            <Link to="/california-poker-rooms">California</Link>
            {' · '}
            <Link to="/texas-poker-rooms">Texas</Link>
            {' · '}
            <Link to="/washington-poker-rooms">Washington</Link>
            {' · '}
            <Link to="/florida-poker-rooms">Florida</Link>
          </p>
        </section>

        <section className="guide-section">
          <h2>Tips</h2>
          <ul className="guide-list">
            <li>Confirm the day’s start time and late-reg cutoff with the room — calendars change for holidays and series.</li>
            <li>Note game type (NLH, PLO, mixed) and any bounty or re-entry rules before you sit.</li>
            <li>If two rooms post similar buy-ins, compare starting stacks, level length, and any GTD to judge playable value.</li>
            <li>Arrive early enough for seat assignment and house rules; some dailies fill or start promptly.</li>
          </ul>
        </section>
      </article>
    );
  }
});

module.exports = GuideDailyTournaments;
