const { origin, startState, validState, setSession } = require('./_utils');

module.exports = async function handler(req, res) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret || !process.env.AUTH_SECRET) return res.status(503).send('Google login is being configured.');
  const redirectUri = `${origin(req)}/api/auth/google`;

  if (!req.query.code) {
    const state = startState(res, 'google');
    const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    url.searchParams.set('client_id', clientId); url.searchParams.set('redirect_uri', redirectUri);
    url.searchParams.set('response_type', 'code'); url.searchParams.set('scope', 'openid email profile');
    url.searchParams.set('state', state); url.searchParams.set('prompt', 'select_account');
    return res.redirect(302, url.toString());
  }
  if (!validState(req, 'google', req.query.state)) return res.redirect(302, '/login?error=state');

  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, code: req.query.code, grant_type: 'authorization_code', redirect_uri: redirectUri })
    });
    const token = await tokenResponse.json();
    if (!token.access_token) throw new Error(token.error_description || 'Token exchange failed');
    const profileResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', { headers: { Authorization: `Bearer ${token.access_token}` } });
    const profile = await profileResponse.json();
    if (!profile.sub) throw new Error('Profile request failed');
    setSession(res, { id: profile.sub, provider: 'google', name: profile.name || profile.email, email: profile.email || '', avatar: profile.picture || '' });
    return res.redirect(302, '/login?authenticated=1');
  } catch (error) {
    console.error('Google OAuth failed:', error?.message || error);
    return res.redirect(302, '/login?error=oauth');
  }
};
