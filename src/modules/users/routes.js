const express = require("express");

const answers = require("../../red/answers");
const controller = require("./index");
const router = express.Router();

router.get("/", all);
router.get("/:id", one);
router.post("/", add);
router.put("/", remove);

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
    const id = req.body.id === undefined ? 0 : req.body.id;
    const body = { ...req.body, id: id };
    const items = await controller.add(body);

    if (body.id == 0) {
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
