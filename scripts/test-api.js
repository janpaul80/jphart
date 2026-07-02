const assert = require('assert');

function response() {
  return {
    statusCode: 200, headers: {}, body: undefined, redirectUrl: undefined,
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
    send(body) { this.body = body; return this; },
    setHeader(name, value) { this.headers[name] = value; },
    redirect(code, url) { this.statusCode = code; this.redirectUrl = url; return this; }
  };
}

async function run() {
  const checkout = require('../api/checkout');
  const contact = require('../api/contact');
  const session = require('../api/auth/session');
  const github = require('../api/auth/github');

  let res = response();
  await checkout({ method: 'POST', body: { plan: 'unknown' }, headers: {} }, res);
  assert.equal(res.statusCode, 400);

  res = response();
  await checkout({ method: 'POST', body: { plan: 'starter' }, headers: { host: 'localhost' } }, res);
  assert.equal(res.statusCode, 503);

  res = response();
  await contact({ method: 'POST', body: {}, headers: {} }, res);
  assert.equal(res.statusCode, 400);

  res = response();
  session({ method: 'GET', headers: {} }, res);
  assert.deepEqual(res.body, { user: null });

  res = response();
  await github({ method: 'GET', query: {}, headers: {} }, res);
  assert.equal(res.statusCode, 503);

  console.log('API validation passed.');
}

run().catch((error) => { console.error(error); process.exit(1); });
