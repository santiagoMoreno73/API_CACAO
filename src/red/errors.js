const answers = require("./answers");

function errors(err, req, res, next) {
  console.log("[error]", err);
  const message = err.message || "Internal Error";
  const status = err.statusCode || 500;

  answers.error(req, res, message, status);
}

module.exports = errors;
