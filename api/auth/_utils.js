const crypto = require('crypto');

const encode = (value) => Buffer.from(typeof value === 'string' ? value : JSON.stringify(value)).toString('base64url');
const decode = (value) => JSON.parse(Buffer.from(value, 'base64url').toString('utf8'));

function sign(payload) {
  if (!process.env.AUTH_SECRET) throw new Error('AUTH_SECRET is not configured');
  const body = encode(payload);
  const signature = crypto.createHmac('sha256', process.env.AUTH_SECRET).update(body).digest('base64url');
  return `${body}.${signature}`;
}

function verify(token) {
  try {
    const [body, supplied] = String(token || '').split('.');
    if (!body || !supplied || !process.env.AUTH_SECRET) return null;
    const expected = crypto.createHmac('sha256', process.env.AUTH_SECRET).update(body).digest('base64url');
    const a = Buffer.from(supplied); const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
    const payload = decode(body);
    if (payload.exp && payload.exp < Date.now()) return null;
    return payload;
  } catch (_) { return null; }
}

function cookies(req) {
  return String(req.headers.cookie || '').split(';').reduce((all, item) => {
    const index = item.indexOf('=');
    if (index > 0) all[item.slice(0, index).trim()] = decodeURIComponent(item.slice(index + 1));
    return all;
  }, {});
}

function origin(req) {
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'paulhartmann.dev';
  return `${protocol}://${host}`;
}

function cookie(name, value, maxAge) {
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

function startState(res, provider) {
  const state = crypto.randomBytes(24).toString('base64url');
  const token = sign({ state, provider, exp: Date.now() + 10 * 60 * 1000 });
  res.setHeader('Set-Cookie', cookie('ph_oauth_state', token, 600));
  return state;
}

function validState(req, provider, supplied) {
  const payload = verify(cookies(req).ph_oauth_state);
  return !!payload && payload.provider === provider && payload.state === supplied;
}

function setSession(res, user) {
  const token = sign({ user, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 });
  res.setHeader('Set-Cookie', [cookie('ph_session', token, 7 * 24 * 60 * 60), cookie('ph_oauth_state', '', 0)]);
}

module.exports = { cookies, origin, startState, validState, setSession, verify, cookie };
