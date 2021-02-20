// import de lib e parametros para realizar conexão
const SEQUELIZE = require("sequelize");
const CONN = new SEQUELIZE("node_projeto_perguntas", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = CONN;
