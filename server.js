//CÓDIGO ANTERIOR QUE ESTAVA FUNCIONANDO
var http = require('http');
var express = require('express');
var app = express();
var passport = require('passport'); //adicionado
var app = require('./config/express')(app);
require('./config/passport')(passport);
const url = 'mongodb+srv://dswa5:dswa5@cluster0.xvyvf.mongodb.net/ifsp?retryWrites=true&w=majority';
require('./config/database.js')(url);
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express Server escutando na porta ' + app.get('port'));
});