const bcrypt = require("bcrypt");
const auth = require("../../auth");
const TABLE = "auth";

module.exports = function (db_injected) {
  let db = db_injected;

  if (!db) {
    db = require("../../db/mysql");
  }

  async function login(user, password) {
    const data = await db.query(TABLE, { user: user });
    const current_user = await db.one("user", data.id);

    return await bcrypt.compare(password, data.password).then((result) => {
      if (result === true) {
        // generate token
        return { token: auth.assignToken({ ...data }), user: current_user };
      } else {
        throw new Error("Invalid data");
      }
    });
  }

  async function add(data) {
    const authData = {
      id: data.id,
    };

    if (data.user) {
      authData.user = data.user;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password.toString(), 5);
    }

    console.log("authData", authData);
    return db.add(TABLE, authData);
  }

  return {
    add,
    login,
  };
};
