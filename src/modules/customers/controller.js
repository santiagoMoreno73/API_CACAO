const db = require("../../db/mysql");

const TABLE = "user";

function all() {
  return db.all(TABLE);
}

function one(id) {
  return db.one(TABLE, id);
}

function add(body) {
  return db.add(TABLE, body);
}

function remove(body) {
  return db.remove(TABLE, body);
}

module.exports = {
  all,
  one,
  add,
  remove,
};
