const { cookie } = require('./_utils');
module.exports = function handler(req, res) {
  res.setHeader('Set-Cookie', cookie('ph_session', '', 0));
  return res.redirect(302, '/login');
};
