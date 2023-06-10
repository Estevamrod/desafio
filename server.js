const express = require('express');
const app = express();

const db = require('./models/db');

app.get('/', async(req, res) => {
    res.send("pagina inicial");
});

app.listen(8080, () => {
    console.log("servidor rodando em localhost:8080");
})