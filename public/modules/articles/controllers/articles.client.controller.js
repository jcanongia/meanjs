'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Artigos', '$http',
	function($scope, $stateParams, $location, Authentication, Artigos, $http) {


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

// Find a list of Articles
		$scope.find = function() {
			$scope.articles = Artigos.query();

		};

// Find existing Article
		$scope.findOne = function() {
			$scope.article = Artigos.get({
				articleId: $stateParams.articleId
			});
		};



// PAGINATION

			 $scope.currentPage = 1;
			 $scope.itemsPerPage = 4; //vai setar o parametro rea.params.query no server.controller

			 $scope.setPage = function (pageNo) {
					 $scope.currentPage = pageNo;
			 };

			 $scope.pageChanged = function () {
					 $scope.getArticles();
			 };

$scope.getArticles = function () {
		$http.get('/totalRegistros').success(function (response) {//busca direto no artigo.server.route
			// console.log(response);
				$scope.totalItems = response;
							$http.get('/articleList/'+$scope.currentPage+'/'+$scope.itemsPerPage)//busca direto no artigo.server.route
					    .success(function (response) {
									$scope.articles = response;
									})
							.error(function (response) {
							 	$scope.error = response.message;
				      });
						})
						.error(function (response) {
						   	$scope.error = response.message;
					    });
	};
// ***************
	}
]);
