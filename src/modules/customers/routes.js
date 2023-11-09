const express = require("express");

const security = require("./security");
const answers = require("../../red/answers");
const controller = require("./index");
const router = express.Router();

router.get("/", all);
router.get("/:id", one);
router.post("/", security(), add);
router.put("/", security(), remove);

async function all(req, res, next) {
  try {
    const items = await controller.all();
    answers.success(req, res, items, 200);
  } catch (error) {
    next(error);
  }
}

async function one(req, res, next) {
  try {
    const items = await controller.one(req.params.id);
    answers.success(req, res, items, 200);
  } catch (error) {
    next(error);
  }
}

async function add(req, res, next) {
  try {
    const items = await controller.add(req.body);
    if (req.body.id == 0) {
      message = "The item was saved successfully";
    } else {
      message = "The item was updated successfully";
    }

    answers.success(req, res, message, 201);
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const items = await controller.remove(req.body);
    answers.success(req, res, "Item deleted successfully", 200);
  } catch (error) {
    next(error);
  }
}

// export
module.exports = router;
