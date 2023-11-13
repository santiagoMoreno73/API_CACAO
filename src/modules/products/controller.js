const TABLE = "product";

module.exports = function (db_injected) {
  let db = db_injected;

  if (!db) {
    db = require("../../db/mysql");
  }

  function all() {
    return db.all(TABLE);
  }

  function one(id) {
    return db.one(TABLE, id);
  }

  async function add(body) {}

  function remove(body) {
    return db.remove(TABLE, body);
  }

  return {
    all,
    one,
    add,
    remove,
  };
};
