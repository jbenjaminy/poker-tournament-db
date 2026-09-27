var fs = require('fs');
var path = require('path');

var SITE = process.env.SITE_URL || 'https://dailytourneys.com';
var rooms;
try {
  rooms = require('../js/rooms-with-schedules.js');
} catch (e) {
  rooms = [];
}

function encPath(name) {
  // Match app encoding used in links: space→_, &→$, ,→4 — then URI-encode
  return encodeURIComponent(
    String(name).split(' ').join('_').split('&').join('$').split(',').join('4')
  );
}

var urls = [
  { loc: '/', priority: '1.0' },
  { loc: '/texas-poker-rooms', priority: '0.8' },
  { loc: '/california-poker-rooms', priority: '0.8' },
  { loc: '/washington-poker-rooms', priority: '0.8' },
  { loc: '/florida-poker-rooms', priority: '0.8' },
  { loc: '/guides/how-daily-tournaments-work', priority: '0.7' },
  { loc: '/guides/tournament-terms', priority: '0.7' }
];

rooms.forEach(function(name) {
  urls.push({
    loc: '/allcasinos/' + encPath(name),
    priority: '0.6'
  });
});

var today = new Date().toISOString().slice(0, 10);
var xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map(function(u) {
    return '  <url>\n' +
      '    <loc>' + SITE + u.loc + '</loc>\n' +
      '    <lastmod>' + today + '</lastmod>\n' +
      '    <priority>' + u.priority + '</priority>\n' +
      '  </url>';
  }).join('\n') +
  '\n</urlset>\n';

var out = path.join(__dirname, '..', 'build', 'sitemap.xml');
fs.writeFileSync(out, xml);
console.log('Wrote sitemap with ' + urls.length + ' URLs → ' + out);
