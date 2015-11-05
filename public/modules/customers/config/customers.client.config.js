'use strict';

// Configuring the Articles module
angular.module('customers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Clientes', 'customers', 'dropdown', '/customers(/create)?');
		Menus.addSubMenuItem('topbar', 'customers', 'Listar Clientes', 'customers');
		Menus.addSubMenuItem('topbar', 'customers', 'Novo Cliente', 'customers/create');
	}
]);
