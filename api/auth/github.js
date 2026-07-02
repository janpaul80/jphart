const { origin, startState, validState, setSession } = require('./_utils');

module.exports = async function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret || !process.env.AUTH_SECRET) return res.status(503).send('GitHub login is being configured.');
  const redirectUri = `${origin(req)}/api/auth/github`;

  if (!req.query.code) {
    const state = startState(res, 'github');
    const url = new URL('https://github.com/login/oauth/authorize');
    url.searchParams.set('client_id', clientId); url.searchParams.set('redirect_uri', redirectUri);
    url.searchParams.set('scope', 'read:user user:email'); url.searchParams.set('state', state);
    return res.redirect(302, url.toString());
  }
  if (!validState(req, 'github', req.query.state)) return res.redirect(302, '/login?error=state');

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code: req.query.code, redirect_uri: redirectUri })
    });
    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) throw new Error(tokenData.error_description || 'Token exchange failed');
    const headers = { Authorization: `Bearer ${tokenData.access_token}`, Accept: 'application/vnd.github+json', 'User-Agent': 'paulhartmann.dev' };
    const [profileResponse, emailsResponse] = await Promise.all([fetch('https://api.github.com/user', { headers }), fetch('https://api.github.com/user/emails', { headers })]);
    const profile = await profileResponse.json();
    const emails = emailsResponse.ok ? await emailsResponse.json() : [];
    const email = profile.email || emails.find((item) => item.primary && item.verified)?.email || emails.find((item) => item.verified)?.email || '';
    setSession(res, { id: String(profile.id), provider: 'github', name: profile.name || profile.login, email, avatar: profile.avatar_url || '' });
    return res.redirect(302, '/login?authenticated=1');
  } catch (error) {
    console.error('GitHub OAuth failed:', error?.message || error);
    return res.redirect(302, '/login?error=oauth');
  }
};
