// import de lib e parametros para realizar conexão
const SEQUELIZE = require("sequelize");
/* const CONN = new SEQUELIZE("node_projeto_perguntas", "root", "", {
  host: "localhost",
  dialect: "mysql",
}); */

if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  const CONN = new SEQUELIZE(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres'
  })
}


module.exports = CONN;
