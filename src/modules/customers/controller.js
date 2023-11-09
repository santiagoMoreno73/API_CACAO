const db = require("../../db/mysql");

const TABLE = "user";

function all() {
  return db.all(TABLE);
}

function one(id) {
  return db.one(TABLE, id);
}

module.exports = {
  all,
  one,
};
