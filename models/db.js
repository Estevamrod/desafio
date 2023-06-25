const Sequelize = require('sequelize');
const sequelize = new Sequelize('encurtador', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(function() {
    console.log("Sucesso: Conexao com o banco de dados realizada com sucesso!");
}).catch(function() {
    console.log("Erro: Conexao com o banco de dados nao realizada com sucesso");
})

module.exports = sequelize;