'use strict';

angular.module('articles').controller('ArtigosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Artigos',
	function($scope, $stateParams, $location, Authentication, Artigos) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var article = new Artigos({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Artigos.query();
		};

		$scope.findOne = function() {
			$scope.article = Artigos.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);