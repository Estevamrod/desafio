const express = require('express');
const app = express();
const db = require('./models/db');
const Url = require('./models/encurtadorModel');

(async() => {
    await db.sync();
});

app.get('/', async(req, res) => {
    await db.sync();
    const query = await Url.findAll();
    let res_urls = {};
    if (query.length !== 0) {
        for(let i = 0; i < query.length; i++) {
            res_urls[i] = {
                "url": query[i]['url_origin'],
                "new_url": query[i]['new_url'],
                "validade": query[i]['validade']
            }
        }
        res.json(res_urls);
    } else {
        res.json({"msg":"empty"});
    }
});

app.get('/url/:url_origin', async(req, res) => {
    await db.sync();
    const newUrl = await Url.create({
        url_origin: req.params['url_origin'],
        new_url: geraStringAleatoria(5),
        validade: new Date()
    });
    res.redirect('/');
});

app.get('/:url', async(req, res) => {
    await db.sync();
    const url_encu = await Url.findAll({
        where: {
            new_url: req.params['url']
        }
    });
    let horario = new Date();
    if (url_encu.length !== 0) {
        let dateDiff = new Date (horario - url_encu[0]['validade']);
        console.log(`Diff: ${dateDiff.getMinutes()}`);
        if (dateDiff.getMinutes() >= 5) {
            await Url.destroy({
                where:{
                    id:url_encu[0]['id']
                }
            });
            res.redirect('/');
        } else {
            res.redirect(`https://${url_encu[0][`url_origin`]}`);
        }
    } else {
        res.redirect('./');
    }
});

app.listen(8080, () => {
    console.log("servidor rodando em localhost:8080");
})

geraStringAleatoria = (tamanho) => {
    var stringAleatoria = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < tamanho; i++) {
        stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return stringAleatoria;
}