const SEQUELIZE = require("sequelize");
const CONN = require("./database");

// ORM ajuda a fazer a representação da tabela de código JS para converter e executer MySql
const Pergunta = CONN.define("pergunta", {
  titulo: {
    type: SEQUELIZE.STRING,
    allowNull: false,
  },
  descricao: {
    type: SEQUELIZE.TEXT,
    allowNull: false,
  },
});

Pergunta.sync({ force: false }).then(() => {});

module.exports = Pergunta;
