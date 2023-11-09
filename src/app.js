//  libs
const express = require("express");
const config = require("./config");
const morgan = require("morgan");

const customers = require("./modules/customers/routes");
const auth = require("./modules/auth/routes");
const error = require("./red/errors");

const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config
app.set("port", config.app.port);

// routes
app.use("/api/customers", customers);
app.use("/api/auth", auth);
app.use(error);

// export
module.exports = app;
