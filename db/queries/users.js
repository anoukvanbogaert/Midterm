const { Pool } = require("pg/lib");
const db = require("../connection");

const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

module.exports = { getUsers };
