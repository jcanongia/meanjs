'use strict';

//Artigos service used for communicating with the articles REST endpoints
angular.module('articles').factory('Artigos', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);