const express = require("express");

const answers = require("../../red/answers");
const controller = require("./controller");
const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const items = await controller.all();
    answers.success(req, res, items, 200);
  } catch (error) {
    response.error(req, res, error, 500);
  }
});

router.get("/:id", async function (req, res) {
  try {
    const items = await controller.one(req.params.id);
    answers.success(req, res, items, 200);
  } catch (error) {
    response.error(req, res, error, 500);
  }
});

// export
module.exports = router;
