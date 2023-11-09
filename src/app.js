const express = require("express");
const config = require("./config");
const morgan = require("morgan");
const customers = require("./modules/customers/routes");
const app = express();

// middleware
app.use(morgan("dev"));

// config
app.set("port", config.app.port);

// routes
app.use("/api/customers", customers);

// export
module.exports = app;
