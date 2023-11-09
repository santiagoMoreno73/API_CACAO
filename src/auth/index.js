const jwt = require("jsonwebtoken");
const config = require("../config");

// Secret key
const secret = config.jwt.secret;

function assignToken(data) {
  return jwt.sign(data, secret);
}

module.exports = {
  assignToken,
};
