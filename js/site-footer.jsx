var React = require('react');
var Link = require('react-router').Link;

var HUB_LINKS = [
  { to: '/texas-poker-rooms', label: 'Texas poker rooms' },
  { to: '/california-poker-rooms', label: 'California poker rooms' },
  { to: '/florida-poker-rooms', label: 'Florida poker rooms' },
  { to: '/washington-poker-rooms', label: 'Washington poker rooms' }
];

var GUIDE_LINKS = [
  { to: '/guides/how-daily-tournaments-work', label: 'How daily tournaments work' },
  { to: '/guides/tournament-terms', label: 'Tournament terms' }
];

var SiteFooter = React.createClass({
  render: function () {
    return (
      <footer className="site-footer" role="contentinfo">
        <div className="site-footer-inner">
          <p className="site-footer-label">Browse by state</p>
          <ul className="site-footer-links">
            {HUB_LINKS.map(function (item) {
              return (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              );
            })}
          </ul>
          <p className="site-footer-label">Guides</p>
          <ul className="site-footer-links">
            {GUIDE_LINKS.map(function (item) {
              return (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </footer>
    );
  }
});

module.exports = SiteFooter;
