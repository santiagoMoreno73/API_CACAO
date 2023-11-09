const express = require("express");

const answers = require("../../red/answers");
const controller = require("./index");
const router = express.Router();

router.get("/login", login);

async function login(req, res, next) {
  try {
    const token = await controller.login(req.body.user, req.body.password);
    answers.success(req, res, token, 200);
  } catch (error) {
    next(error);
  }
}

// export
module.exports = router;
