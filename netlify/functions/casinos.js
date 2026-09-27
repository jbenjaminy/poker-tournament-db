/**
 * Netlify Function: casino + tournament API (mirrors mock-server.js).
 * Async handler (Node 24+ no longer supports callback style).
 */
var seed = require('./_seed');

function json(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(body)
  };
}

function routePath(event) {
  var raw =
    (event.headers && (event.headers['x-forwarded-url'] || event.headers['X-Forwarded-Url'])) ||
    event.rawUrl ||
    event.path ||
    '';
  try {
    if (/^https?:\/\//i.test(raw)) raw = new URL(raw).pathname;
  } catch (e) {}
  raw = String(raw).split('?')[0];
  raw = raw.replace(/^\/\.netlify\/functions\/casinos\/?/, '/casinos/');
  if (raw.indexOf('/casinos') === -1) {
    var q = event.queryStringParameters || {};
    if (q.path) raw = '/casinos/' + q.path;
    else if (raw && raw !== '/') raw = '/casinos' + (raw.charAt(0) === '/' ? raw : '/' + raw);
    else raw = '/casinos';
  }
  return raw.replace(/\/+$/, '') || '/casinos';
}

exports.handler = async function(event) {
  if (event.httpMethod && event.httpMethod !== 'GET' && event.httpMethod !== 'HEAD') {
    return json(405, { error: 'Method not allowed' });
  }

  try {
    var data = seed.getData();
    var p = routePath(event);

    if (p === '/casinos') {
      var pokerRooms = data.casinos.filter(function(c) { return c.has_poker; });
      return json(200, pokerRooms.map(function(c, i) {
        return { name: c.name, id: i + 1 };
      }));
    }

    var tourneyMatch = p.match(/^\/casinos\/(.+)\/tournaments$/);
    if (tourneyMatch) {
      var tName = seed.decodeName(tourneyMatch[1]);
      var rows = data.tournaments.filter(function(t) { return t.casino_name === tName; });
      return json(200, rows);
    }

    var nameMatch = p.match(/^\/casinos\/(.+)$/);
    if (nameMatch) {
      var cName = seed.decodeName(nameMatch[1]);
      var found = data.casinos.filter(function(c) { return c.name === cName; });
      return json(200, found);
    }

    return json(404, { error: 'Not found', path: p });
  } catch (err) {
    return json(500, { error: String(err && err.message ? err.message : err) });
  }
};
