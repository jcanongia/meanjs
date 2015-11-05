'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * A Validation function for local strategy properties
*/
	var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};


/**
 * Customer Schema
 */
var CustomerSchema = new Schema({
	firstName: {
		type: String,
		default: '',
		trim: true,
		validate: [validateLocalStrategyProperty, 'Por favor, preencha com seu Primeiro Nome']
	},
	surName: {
		type: String,
		default: '',
		trim: true,
		validate: [validateLocalStrategyProperty, 'Por favor, preencha com seu Último Nome']
	},
	suburb: {
		type: String,
		default: '',
		trim: true
	},
	country: {
		type: String,
		default: '',
		trim: true
	},
		industry: {
		type: String,
		default: '',
		trim: true
	},
		email: {
		type: String,
		default: '',
		trim: true
	},
		phone: {
		type: String,
		default: '',
		trim: true
	},
		referred: {
		type: Boolean
	},
		channel: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Customer', CustomerSchema);
// A última linha deste código compila o modelo Customer utilizando o esquema CustomerSchema como estrutura.
// O Mongoose também cria uma coleção no MongoDB chamada Customers para estes documentos.
