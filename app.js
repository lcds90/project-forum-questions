const EXPRESS = require("express");
const APP = EXPRESS();
const BP = require("body-parser");
const CONN = require("./database/database");
const Pergunta = require("./database/Perguntas");
const Resposta = require("./database/Resposta");

// Definir lib  para gerar HTML
APP.set("view engine", "ejs");
APP.use(EXPRESS.static("public"));

// Testando conexão com sequelize e mysql
CONN.authenticate()
  .then(() => {
    console.log("Conexão realizada com sucesso");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

// Configuração do body-parser
APP.use(BP.urlencoded({ extended: false }));
APP.use(BP.json());

APP.get("/", (req, res) => {
  // raw true trazer dados puros, somente eles
  // order = regra de ordenação
  // buscando dados armazenados na var de perguntas
  Pergunta.findAll({
    raw: true,
    order: [
      ["id", "DESC"], // ASC = Crescente, DESC = Decrescente
    ],
  }).then((perguntas) => {
    res.render("index", {
      perguntas: perguntas,
    });
  });
});

APP.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

APP.post("/salvarPergunta", (req, res) => {
  // req.body é possível através da lib do body parser para pegar requisição do formulario
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;

  // Recebendo dados e atribuindo no model em cada campo criado
  Pergunta.create({
    titulo: titulo,
    descricao: descricao,
  }).then(() => {
    res.redirect("/");
  });
});
APP.get("/pergunta/:id", (req, res) => {
  var id = req.params.id;

  // realizar busca do item no banco de dados de parametro com dado no banco
  Pergunta.findOne({
    where: { id: id },
  }).then((pergunta) => {
    if (pergunta != undefined) {
      // compara dentro do model de resposta que correspondam ao id da pergunta atual
      Resposta.findAll({
        where: { perguntaId: pergunta.id },
        order: [
          ["id", "DESC"]
        ],
      }).then((respostas) => {
        res.render("pergunta", {
          pergunta: pergunta,
          respostas: respostas,
        });
      });
    } else {
      res.redirect("/");
    }
  });
});

APP.post("/responder", (req, res) => {
  // post de form das respostas e atribuindo ao model com id de pergunta
  var id_pergunta = req.body.pergunta;
  var corpo = req.body.corpo;

  Resposta.create({
    corpo: corpo,
    perguntaId: id_pergunta,
  }).then(() => {
    res.redirect("/pergunta/" + id_pergunta);
  });
});

APP.listen(8080, () => {
  setTimeout(() => {
    console.log("App rodando em http://localhost:8080");
  }, 500);
});
