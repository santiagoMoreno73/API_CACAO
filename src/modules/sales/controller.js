const TABLE = "sale";

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

  async function add(body) {
    const sale = {
      id: body.id,
      id_user: body.id_user,
      id_product: body.id_product,
      quantity: body.quantity,
      total: body.total,
    };

    const response = await db.add(TABLE, sale);

    return response;
  }

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
