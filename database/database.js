// import de lib e parametros para realizar conexão
const SEQUELIZE = require("sequelize");
const CONN = new SEQUELIZE("ddptofaomo3fdm", "blotcomdrxibro", "7d574d49dc5d703ee4cd31bddcd559a0dfcc6f29ee66ab585a546d70a007970c", {
  host: DATABASE_URL,
  dialect: "postgres",
});

module.exports = CONN;
