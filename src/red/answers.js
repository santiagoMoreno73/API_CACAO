// Success response
exports.success = function (req, res, message = "", status = 200) {
  res.status(status).json({
    error: false,
    status: status,
    body: message,
  });
};

// Error response
exports.error = function (req, res, message = "Internal Error", status = 500) {
  res.status(status).json({
    error: true,
    status: status,
    body: message,
  });
};
