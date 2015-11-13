'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	articles = require('../../app/controllers/articles.server.controller');

module.exports = function(app) {
	// Artigo Routes
	app.route('/articles')
		.get(users.hasAuthorization(['admin','user']), articles.list)
		// .get(users.requiresLogin, articles.list) para verificar apenas se o usuário está logado
		.post(users.requiresLogin, articles.create);

//PAGINATION
  app.route('/articleList/:page/:query')
    .get(articles.articlesList);

//************************

	app.route('/articles/:articleId')
		.get(articles.read)
		.put(users.requiresLogin, articles.hasAuthorization, articles.update)
		.delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

	app.route('/totalRegistros')
    .get(articles.totalRegistros);

	// Finish by binding the article middleware
	app.param('articleId', articles.articleByID);
};
