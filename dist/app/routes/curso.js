var verificaAutenticacao = require('../../config/auth');

module.exports = function(app) {
    var controller = app.controllers.curso;
    app.route('/cursos')
        .get(verificaAutenticacao, controller.listaCursos)
        .post(verificaAutenticacao, controller.salvaCurso);
    app.route('/cursos/:id')
        .get(verificaAutenticacao, controller.obtemCurso)
        .delete(verificaAutenticacao, controller.removeCurso);
};