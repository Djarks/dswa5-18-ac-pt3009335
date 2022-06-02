var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var mongoose = require('mongoose');

module.exports = function() {
    var usuario = mongoose.model('usuario');
    
    passport.use(new GitHubStrategy({
        clientID: 'a66c99849bda57df84c1',
        clientSecret: 'fb66f7704fc0433c06a4c67718d27fbbd0514598',
        callbackURL: 'https://dswa5-17-ac-pt3009335.herokuapp.com/auth/github/callback'
        }, function(accessToken, refreshToken, profile, done) {
            usuario.findOrCreate(
                { "login" : profile.username},
                { "nome" : profile.username},
                function(erro, usuario) {
                    if(erro){
                        console.log(erro);
                        return done(erro);
                    }
                    return done(null, usuario);
                }
            );
        }
    ));

    /*
    Chamado apenas UMA vez e recebe o usuário do nosso
    banco disponibilizado pelo callback da estratégia de
    autenticação. Realizará a serialização apenas do
    ObjectId do usuário na sessão.
    */
    passport.serializeUser(function(usuario, done) {
        done(null, usuario._id);
    });
            
    // Recebe o ObjectId do usuário armazenado na sessão
    // Chamado a CADA requisição
    passport.deserializeUser(function(id, done) {
        usuario.findById(id).exec().then(function(usuario) {
            done(null, usuario);
        });
    });
};