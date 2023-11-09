const mysql = require("mysql");
const config = require("../config");

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let conexion;

function conexionMySql() {
  // create conexion
  conexion = mysql.createConnection(dbconfig);

  // if the connection fails, try to connect again
  conexion.connect((error) => {
    if (error) {
      console.log("[db error]", error);
      setTimeout(conexionMySql(), 200);
    } else {
      console.log("Connected database");
    }
  });

  // if the connection is lost
  conexion.on("error", (error) => {
    console.log("[db error]", error);
    if (error.code === "PROTOCOL_CONNECTION_LOST") {
      conexionMySql();
    } else {
      throw error;
    }
  });
}

// run conexion
conexionMySql();

function all(table) {
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT * FROM ${table}`, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function one(table, id) {
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT * FROM ${table} WHERE id=${id}`, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function remove(table, data) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `DELETE FROM ${table} WHERE id = ?`,
      data.id,
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}

function add(table, data) {
  if (data && data.id == 0) {
    return insert(table, data);
  } else {
    return update(table, data);
  }
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
    conexion.query(`INSERT INTO ${table} SET ?`, data, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function update(table, data) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `UPDATE ${table} SET ? WHERE id = ?`,
      [data, data.id],
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}

module.exports = {
  all,
  one,
  add,
  remove,
};
