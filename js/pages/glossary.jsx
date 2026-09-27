var React = require('react');
var router = require('react-router');
var Link = router.Link;

var PAGE_TITLE = 'Poker Tournament Terms Glossary | Daily Tourneys';

var TERMS = [
  {
    term: 'Addon',
    def: 'An optional extra purchase of chips, usually available once at the end of the rebuy period. Often cheaper per chip than a rebuy.'
  },
  {
    term: 'Blind levels',
    def: 'Timed steps that raise the forced bets (blinds/antes). Shorter levels speed the tournament; longer levels favor deeper play.'
  },
  {
    term: 'Bubble',
    def: 'The stage just before the money. The next elimination ends unpaid finishes; the following finishers are “in the money” (ITM).'
  },
  {
    term: 'Bounty',
    def: 'A cash reward for eliminating a player. In progressive knockouts (PKO), part of each bounty is kept and part is added to your own bounty.'
  },
  {
    term: 'Buy-in',
    def: 'The cost to enter. Often shown as prize-pool amount plus house fee (e.g. $100 + $20), or as one combined total.'
  },
  {
    term: 'Daily (daily tournament)',
    def: 'A recurring tournament on a room’s regular calendar — often every day or the same weekday — typically smaller than festival “majors.”'
  },
  {
    term: 'Freezeout',
    def: 'A format with one entry only. If you lose all your chips, you are out; no rebuy or re-entry.'
  },
  {
    term: 'Guaranteed (GTD)',
    def: 'A posted minimum prize pool. If buy-ins fall short, the house adds money so the pool still hits the guarantee.'
  },
  {
    term: 'ITM (in the money)',
    def: 'Finishing high enough to earn a prize-pool payout. The cut line depends on field size and the posted payout structure.'
  },
  {
    term: 'Late registration',
    def: 'The window after the official start when new players (and often re-entries) can still join. Usually closes after a set number of levels.'
  },
  {
    term: 'Rebuy',
    def: 'Buying more chips after dropping to a threshold (or busting) during an early period. Common in “rebuy” tournaments; distinct from full re-entry at some rooms.'
  },
  {
    term: 'Re-entry',
    def: 'Buying a fresh entry after busting, usually during late registration. Each entry is a new “bullet” with a full starting stack.'
  },
  {
    term: 'Satellite',
    def: 'A tournament whose main prizes are seats (or packages) into a larger event, rather than only cash. Buy-ins are often much lower than the target event.'
  },
  {
    term: 'Starting stack',
    def: 'The chip amount each player receives at the start (or on re-entry). Larger stacks relative to blinds usually mean longer average play.'
  },
  {
    term: 'Structure',
    def: 'The combination of starting stack, blind schedule, level length, and any rebuy/re-entry rules that shape how fast the tournament plays.'
  },
  {
    term: 'Turbo',
    def: 'A fast structure with short blind levels (and often shallower stacks). Fields bust quicker; variance is usually higher than deep structures.'
  }
];

var Glossary = React.createClass({
  componentDidMount: function() {
    document.title = PAGE_TITLE;
  },
  componentWillUnmount: function() {
    document.title = 'Daily Tourneys | U.S. Casino & Poker Room Tournament Schedules';
  },
  render: function() {
    var items = TERMS.map(function(item) {
      return (
        <div className="glossary-item" key={item.term}>
          <dt>{item.term}</dt>
          <dd>{item.def}</dd>
        </div>
      );
    });

    return (
      <article className="content-page glossary-page">
        <div className="detail-toolbar">
          <Link to="/allcasinos" className="back-link">← Back to search</Link>
        </div>
        <h1 className="content-h1">Poker tournament terms</h1>
        <p className="content-lead">
          A single A–Z reference for common casino and card-room tournament language you’ll see on Daily Tourneys schedules.
        </p>
        <dl className="glossary-list">
          {items}
        </dl>
        <p className="content-cta">
          New to dailies? Read <Link to="/guides/how-daily-tournaments-work">how daily casino tournaments work</Link>
          {' · '}
          <Link to="/allcasinos">Search schedules</Link>
        </p>
      </article>
    );
  }
});

module.exports = Glossary;
