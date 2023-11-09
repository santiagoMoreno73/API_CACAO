const jwt = require("jsonwebtoken");
const config = require("../config");

// Secret key
const secret = config.jwt.secret;
const error = require("../middleware/errors");

function assignToken(data) {
  return jwt.sign(data, secret);
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

const checkToken = {
  confirmToken: function (req, id) {
    if (id == 0) return;

    const decode = decodeHead(req);

    if (decode.id !== id) {
      throw error("Invalid action: cannot modify users.", 401);
    }
  },
};

function getToken(auth) {
  if (!auth) {
    throw error("No token exists", 401);
  }

  if (auth.indexOf("Bearer") === -1) {
    throw error("Invalid format", 401);
  }

  let token = auth.replace("Bearer ", "");
  return token;
}

function decodeHead(req) {
  const auth = req.headers.authorization || "";
  const token = getToken(auth);
  const decode = verifyToken(token);

  req.user = decode;

  return decode;
}

module.exports = {
  assignToken,
  checkToken,
};
