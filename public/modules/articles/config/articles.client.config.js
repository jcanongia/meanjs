'use strict';

// Configuring the Artigos module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Artigos', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'Listar Artigos', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'Novo Artigo', 'articles/create');
	}
]);