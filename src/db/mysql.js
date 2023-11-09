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

function add(table, data) {}

function remove(table, id) {}

module.exports = {
  all,
  one,
  add,
  remove,
};
