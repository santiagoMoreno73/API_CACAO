const auth = require("../../auth");

module.exports = function checkAuth() {
  function middleware(req, res, next) {
    auth.checkToken.confirmToken(req, req.body.id);
    next();
  }

  return middleware;
};
