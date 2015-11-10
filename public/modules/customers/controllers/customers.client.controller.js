'use strict';

// Customers controller

var customersApp = angular.module('customers');

customersApp.controller('CustomersController', ['$scope', '$stateParams', 'Authentication', 'Customers', '$modal', '$log',
   function($scope, $stateParams, Authentication, Customers, $modal, $log) {

	   this.authentication = Authentication;

	   // Find a list of Customers
	   this.customers = Customers.query();

     $scope.channelOptions = [
       {id: 1, item: 'Facebook'},
       {id: 2, item: 'Twitter'},
       {id: 3, item: 'Email'},
     ];


// console.log('Estou no CustomersController');

     // Open a modal window to Create a single customer record
		this.modalCreate = function (size){

//  console.log('Estou no modalCreate');

			var modalInstance = $modal.open({
				templateUrl:'modules/customers/views/create-customer.client.view.html',
				controller: function ($scope, $modalInstance){
					$scope.ok = function() {
					$log.info('Novo Cliente criado em:' + new Date());


          $modalInstance.close();
          location.href='/#!/customers';
					 };

					$scope.cancel = function () {
					 $modalInstance.dismiss('cancel');
				   location.href='/#!/customers';
         };
				},
				size: size
			});

			modalInstance.result.then(function(selectedItem){
			}, function(){

			});

     };

		 // Open a modal window to Update a single customer record
		 this.modalUpdate = function (size, selectedCustomer){
		   var modalInstance = $modal.open({
			   templateUrl:'modules/customers/views/edit-customer.client.view.html',
			   controller: function ($scope, $modalInstance, customer){
					 $scope.customer = customer;

					 $scope.ok = function() {
						 $scope.customer.channel= $scope.customer.channel.item; //Atribuo o item do array Channels no objeto channel que é persistido
             $modalInstance.close($scope.customer);
             $log.info('Cliente alterado em:' + new Date());
             alert('Cliente Nome: '+($scope.customer.firstName)+'  alterado em: ' + new Date());
             location.href='/#!/customers';
					 };

					 $scope.cancel = function () {
					 	$modalInstance.dismiss('cancel');
            location.href='/#!/customers';
					};
				 },
			   size: size,
			   resolve:{
				   customer: function(){
					   return selectedCustomer;
				   }
			   }
		   });

		   modalInstance.result.then(function(selectedItem){
			   $scope.selected = selectedItem;

		   },
        function(){

       });
   	};

		// Remove existing Customer
		this.remove = function(customer) {
			if ( customer ) { customer.$remove();

				for (var i in this.customers) {
					if (this.customers [i] === customer) {
						this.customers.splice(i, 1);
					}
				}
			} else {
				this.customer.$remove(function() {
				});
			}
		};


   }
]);

customersApp.controller('CustomersCreateController', ['$scope', 'Customers', 'Notify',
	function($scope, Customers, Notify) {


    	// Create new Customer
		this.create = function() {

    	// Create new Customer object
			var customer = new Customers ({
				firstName: this.firstName,
				surName: this.surName,
				suburb: this.suburb,
				country: this.country,
			  industry: this.industry,
				email: this.email,
				phone: this.phone,
				referred: this.referred,
				channel: this.channel.item
		    	});

        // Redirect after save
			customer.$save(function(response) {

        Notify.sendMsg('NewCustomer', {'id': response._id});
        alert('Cliente Nome: '+(customer.firstName)+'  criado em: ' + new Date());

		// // Clear form fields
				// $scope.firstName = '';
				// $scope.surName = '';
				// $scope.suburb = '';
				// $scope.country = '';
				// $scope.industry = '';
				// $scope.email = '';
				// $scope.phone = '';
				// $scope.referred = '';
				// $scope.channel = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);


customersApp.controller('CustomersUpdateController', ['$scope', 'Customers', 'Notify',
	function($scope, Customers, Notify) {

    	// Update existing Customer
		this.update = function(updatedCustomer) {
      //console.log (updatedCustomer.channel);

			var customer = updatedCustomer;

			customer.$update(function(response) {
      Notify.sendMsg('UpdatedCustomer', {'id': response._id});

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

	}
]);


customersApp.directive('customerList',['Customers', 'Notify', function (Customers, Notify) {
	return{
		restrict:'E',
		transclude: true,
		templateUrl:'modules/customers/views/list-customer.template.html',
		link: function (scope, element, attrs) {

      // When a new Customer is added, update the customer list

      Notify.getMsg('NewCustomer', function(event, data){

        scope.customersCtrl.customers = Customers.query();

      });
		}
	};
}]);






		//
		//
		//
		// // Find existing Customer
		// $scope.findOne = function() {
		// 	$scope.customer = Customers.get({
		// 		customerId: $stateParams.customerId
		// 	});
		// };
