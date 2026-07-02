const { cookies, verify } = require('./_utils');
module.exports = function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const session = verify(cookies(req).ph_session);
  return res.status(200).json({ user: session?.user || null });
};
