//  libs
const express = require("express");
const config = require("./config");
const morgan = require("morgan");

const users = require("./modules/users/routes");
const products = require("./modules/products/routes");
const auth = require("./modules/auth/routes");
const sales = require("./modules/sales/routes");
const error = require("./red/errors");
const cors = require("cors");
const app = express();

// cors
app.use(cors());

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config
app.set("port", config.app.port);

// routes
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/auth", auth);
app.use("/api/sales", sales);
app.use(error);

// export
module.exports = app;
