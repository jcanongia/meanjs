'use strict';
angular.module('articles').controller('ArticleAuthorizationController',
['$scope', '$stateParams', '$location', 'Authentication','Artigos',
    function($scope, $stateParams, $location, Authentication, Artigos) {
        // console.log(Authentication.user.roles);
   $scope.authentication = Authentication;
 if ($scope.authentication.user.roles.indexOf('admin')!==-1
    // ||$scope.authentication.user.roles.indexOf('admin')!== -1 //***** usando o OR *****
    ) {

   console.log('Estou no IF');
   // $location.path('/signin');
  }else {
    console.log('Estou no ELSE');
  }
}]);
//
// angular.module('articles').controller('Article2AuthorizationController',
// ['$scope', '$stateParams', '$location', 'Authentication','Artigos',
//     function($scope, $stateParams, $location, Authentication, Artigos) {
//         // console.log(Authentication.user.roles);
//    $scope.authentication = Authentication;
//  if ($scope.authentication.user.roles.indexOf('user')!==-1
//     // ||$scope.authentication.user.roles.indexOf('admin')!== -1
//     ) {
//
//    console.log('Estou no IF');
//    // $location.path('/signin');
//
//   }else {
//     console.log('Estou no ELSE');
//   }
// }]);
