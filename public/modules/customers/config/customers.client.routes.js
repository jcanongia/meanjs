'use strict';

//Setting up route
angular.module('customers').config(['$stateProvider',
	function($stateProvider) {
		// Customers state routing
		$stateProvider.
		state('listCustomers', {
			url: '/customers',
			templateUrl: 'modules/customers/views/list-customers.client.view.html'
		}).
		state('createCustomer', {
			url: '/customers/create',
			template:'<section data-ng-controller="CustomersController as customersCtrl">'+
			'<div ng-init="customersCtrl.modalCreate(\'lg\')"></div>'+
			'</section>'
   
		});
	}
]);
