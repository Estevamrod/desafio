const express = require('express');
const app = express();
const db = require('./models/db');
const Url = require('./models/encurtadorModel');

(async() => {
    await db.sync();
});

app.get('/', async(req, res) => {
    const query = await Url.findAll();
    if (query.length !== 0) {
        let resArr = {};
        for(let i = 0; i < query.length; i++) {
            const horario = new Date().getMinutes();
            const val = query[i]['validade'].getMinutes();
            let diff = valiCh(horario,val);
            if (diff != 0) {
                resArr[i] = {
                    'status_code': 200,
                    'status': 'success',
                    'data': {
                        'Urls': [
                            {
                                'url': query[i]['url_origin'],
                                'new_url': query[i]['new_url'],
                                'validade': diff + "m restante (s)"
                            }
                        ]
                    }
                }
            } else {
                await Url.destroy({
                    where:{
                        id:query[i]['id']
                    }
                });
            }
        }
        res.json(resArr);
    } else {
        res.json({
            'status_code': 204,
            'status':'empty',
            'data': {
                'Urls': [
                    {
                        'msg':'empty'
                    }
                ]
            }
        });
    }
});

app.get('/url/:url_origin', async(req, res) => {
    await Url.create({
        url_origin: req.params['url_origin'],
        new_url: geraStringAleatoria(5),
        validade: new Date()
    });
    res.redirect('/');
});

app.get('/:url', async(req, res) => {
    const url_encu = await Url.findAll({
        where: {
            new_url: req.params['url']
        }
    });
    if (url_encu.length !== 0) {
        let horario = new Date();
        let dateDiff = new Date (horario-url_encu[0]['validade']);
        dateDiff = 5 - dateDiff.getMinutes();
        console.log(`Diff: ${dateDiff}`);
        if (dateDiff === 0) {
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


valiCh = (min, val) => {
    let validade = 0;
    let diff = 5 - (min - val);
    if (diff > 5) {
        console.log(`diff minutes: ${diff};`);
        return validade;
    } else {
        validade = diff;
        console.log(`diff minutes: ${diff};`);
        return validade;
    }
} 

geraStringAleatoria = (tamanho) => {
    var stringAleatoria = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < tamanho; i++) {
        stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return stringAleatoria;
}