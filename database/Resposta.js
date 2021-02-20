const SEQUELIZE = require("sequelize");
const CONN = require("./database");

const Resposta = CONN.define("respostas", {
  corpo: {
    type: SEQUELIZE.TEXT,
    allowNull: false,
  },
  // relacionamento cru entre tabelas
  perguntaId: {
    type: SEQUELIZE.INTEGER,
    allowNull: false,
  },
});

Resposta.sync({ force: false });

module.exports = Resposta;
