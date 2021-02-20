// import de lib e parametros para realizar conexão
const SEQUELIZE = require("sequelize");
const CONN = new SEQUELIZE(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: 'postgres',
});

module.exports = CONN;
