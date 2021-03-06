'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Artigo = mongoose.model('Artigo'),
	_ = require('lodash');



/**
 * Create a article
 */
exports.create = function(req, res) {
	var article = new Artigo(req.body);
	article.user = req.user;

	article.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
	res.json(req.article);
};

/**
 * Update a article
 */
exports.update = function(req, res) {
	var article = req.article;

	article = _.extend(article, req.body);

	article.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
	var article = req.article;

	article.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};

/**
 * List of Artigos
 */
exports.list = function(req, res) {
	Artigo.find().sort('-created').populate('user', 'displayName').exec(function(err, articles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(articles);
		}
	});
};

/**
* Paginate Total de Itens
**/
exports.totalRegistros = function(req, res) {
	Artigo.count(function(err, c) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			// console.log('Count is ' + c);
			res.json(c);
		}
	});
};

/**
* Paginate List articles
**/

exports.articlesList = function(req, res){
    if(!req.params.page)
    {
        var page = 1;
    }else{
        var page = req.params.page;
    }
// console.log(req.params.page);

  var per_page = req.params.query;
// console.log(req.params.query);

    Artigo.find().sort('-created').skip((page-1)*per_page).limit(per_page).populate('user', 'displayName').exec(function(err, articles) {
        if (err) {return res.status(400).send({
                message: errorHandler.getErrorMessage(err)});
        } else {res.json(articles);}
    });
};
// ****************************************
/**
 * Artigo middleware
 */
exports.articleByID = function(req, res, next, id) {
	Artigo.findById(id).populate('user', 'displayName').exec(function(err, article) {
		if (err) return next(err);
		if (!article) return next(new Error('Failed to load article ' + id));
		req.article = article;
		next();
	});
};

/**
 * Artigo authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.article.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
