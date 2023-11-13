const TABLE = "user";
const auth = require("../auth");

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
    const user = {
      name: body.name,
      email: body.email,
      address: body.address,
      active: body.active,
    };

    const response = await db.add(TABLE, user);
    let insertId = 0;

    if (body.id == 0) {
      insertId = response.insertId;
    } else {
      insertId = body.id;
    }

    let response_two = "";
    if (body.user || body.password) {
      const user = {
        id: insertId,
        user: body.user,
        password: body.password,
      };

      response_two = await auth.add(user);
    }

    return response_two;
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
