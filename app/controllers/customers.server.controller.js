'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Customer = mongoose.model('Customer'),
	_ = require('lodash');

/**
 * Create a Customer
 */
exports.create = function(req, res) {
	var customer = new Customer(req.body);
	customer.user = req.user;

	customer.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(customer);
		}
	});
};

/**
 * Show the current Customer
 */
exports.read = function(req, res) {
	res.jsonp(req.customer);
};

/**
 * Update a Customer
 */
exports.update = function(req, res) {
	var customer = req.customer ;

	customer = _.extend(customer , req.body);

	customer.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(customer);
		}
	});
};

/**
 * Delete an Customer
 */
exports.delete = function(req, res) {
	var customer = req.customer ;

	customer.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(customer);
		}
	});
};

/**
 * List of Customers
 */
exports.list = function(req, res) {
	Customer.find().sort('-created').populate('displayName').exec(function(err, customers) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(customers);
		}
	});
};

/**
 * Customer middleware
 */
exports.customerByID = function(req, res, next, id) {
	Customer.findById(id).populate('user', 'displayName').exec(function(err, customer) {
		if (err) return next(err);
		if (! customer) return next(new Error('Failed to load Customer ' + id));
		req.customer = customer ;
		next();
	});
};

/**
 * Customer authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.customer.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

// Paginação com mongoose-paginate

// Install
// >npm install -S mongoose-paginate

// Adicionar ao Schema
//    var mongoosePaginate = require('mongoose-paginate');
//    MySchema.plugin(mongoosePaginate);

// Como Usar - MySchema.paginate(query, options, [callback])
// Arguments/
    // query - An object for the Mongoose query.
    // options - An object with options for the Mongoose query, such as sorting and population
    //     page - Default: 1
    //     limit - Default: 10
    //     columns - Default: null
    //     sortBy - Default: null
    //     populate - Default: null
    //     lean - Default: null
    // callback(err, results, pageCount, itemCount) - If specified the callback is called once pagination results are retrieved, or when an error has occurred. Otherwise will return a promise.

// Exemplos

// basic example usage of `mongoose-pagination`
// querying for `all` {} items in `MySchema`
// paginating by second page, 10 items per page (10 results, page 2)

// var mongoosePaginate = require('mongoose-paginate');
//
// MySchema.plugin(mongoosePaginate);
//
// MySchema.paginate({}, {
//   page: 2, limit: 10
// }, callback);

// basic example usage of `mongoose-pagination` with promises
// querying for `all` {} items in `MySchema`
// paginating by second page, 10 items per page (10 results, page 2)

// var mongoose = require('mongoose'); // required mongoose v4.1.0 or higher
// mongoose.Promise = require('bluebird');
// var mongoosePaginate = require('mongoose-paginate');
//
// MySchema.plugin(mongoosePaginate);
//
// MySchema.paginate({}, {
//   page: 2, limit: 10
// })
//   .spread(function(questions, pageCount, itemCount) {
//     ...
//   })
//   .catch(function(err) {
//     return next(err);
//   });

//URL: https://www.npmjs.com/package/mongoose-paginate
