var express = require('express');
const fs = require('fs');
const ini =  require('ini');

var app = express();
var repertoireFilm = "";
var oPlayer = {};

//Chargement fichier de configuration
loadIni();

//Liste des films
app.get('/films', function (req, resReq) {
     getListFilms(resReq);
});

//Player
app.get('/player/:action', function (req, resReq) {
    actionPlayer(req, resReq);
})
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Erreur 404 - Page introuvable !');
});

function getListFilms (resReq) {
    var retour = [];
    var film = {};

    fs.readdir(repertoireFilm, function (errorFs, resFs) {
            if (errorFs) {
                console.log('erreur readir ' + repertoireFilm);
                console.log('erreur readir ' + error);
                resReq.setHeader('Content-Type', 'text/plain');
                resReq.status(404).send("Erreur 404!");
                return;
            }
            else {
                resReq.setHeader('Content-Type', 'application/json');
                resReq.status(200).send(JSON.stringify(resFs));
                resReq.end();

            }
        }
        
    );
    
}

function loadIni () {
    var config = ini.parse(fs.readFileSync('./configServeur.ini', 'utf-8'));
    repertoireFilm = config.films.repertoire;
    console.log('repertoireFilm ' + repertoireFilm);
}

function actionPlayer(req, resReq){
    switch (req.params.action) {
        //Lecture
        case 'play':
            resReq.status(200).send(('player play'));;
            break;

        //Pause
        case 'pause':
            resReq.status(200).send(('player pause'));;
            break;

        //Stop
        case 'stop':
            resReq.status(200).send(('player stop'));;
            break;

        //status
        case 'status':
            resReq.status(200).send(('player status'));;
            break;
    }
    resReq.end();
}

app.listen(8080);