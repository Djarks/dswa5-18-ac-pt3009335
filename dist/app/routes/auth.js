var passport = require('passport');

module.exports = function(app) {
    app.use(passport.session());

    app.get('/', function(req, res, next) {
        
        if(req.isAuthenticated()) {
            return next();
        } else {
        // renderiza auth.ejs
        res.render("auth");
        }
    });

    app.get('/auth/github', passport.authenticate('github'));
    
    app.get('/auth/github/callback', passport.authenticate('github', {
        successRedirect: '/'
    }));

    app.get('/logout', function(req, res){
        req.logOut(); //exposto pelo passport
        res.redirect('/');
    });
};