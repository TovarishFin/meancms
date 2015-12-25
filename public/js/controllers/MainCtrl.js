angular.module('MainAppController',[])
	.controller('HomeCtrl',['$scope', function($scope){
		$scope.test='testorino diddly doo';
	}])

	.controller('ProdCtrl', ['$scope', 'apiCall', function($scope, apiCall){
		$scope.products=apiCall.stuff;
		
		$scope.sortmethod='';
		$scope.reverse=false;		
		$scope.sort = function(sortmethod) {
		$scope.reverse = ($scope.sortmethod === sortmethod) ? !$scope.reverse :$scope.reverse;
		$scope.sortmethod = sortmethod;
		};
		
		$scope.createProduct=function(){
			apiCall.createProduct($scope.product);
			$scope.product={};
		};
		
		$scope.editProduct= function(product){
			apiCall.updateProduct(product);
		};
		
		$scope.deleteProduct=function(id){
			apiCall.deleteProduct(id);
		};
	}])
	.controller('pMethodCtrl',['$scope', 'apiCall',function($scope, apiCall){
		$scope.pMethods=apiCall.stuff;
		
		$scope.sortmethod='';
		$scope.reverse=false;		
		$scope.sort = function(sortmethod) {
		$scope.reverse = ($scope.sortmethod === sortmethod) ? !$scope.reverse :$scope.reverse;
		$scope.sortmethod = sortmethod;
		};
		
		$scope.createPmethod=function(){
			apiCall.createPmethod($scope.pMethod);
			$scope.pMethod={};
		};
		
		$scope.editPmethod = function(pMethod){
			apiCall.updatePmethod(pMethod);
		};
		
		$scope.deletePmethod=function(id){
			apiCall.deletePmethod(id);
		};
		
		
	}])
	.controller('CustomerCtrl', ['$scope', 'apiCall', function($scope, apiCall){
		$scope.customers= apiCall.stuff;
		
		$scope.sortmethod='';
		$scope.reverse=false;		
		$scope.sort = function(sortmethod) {
		$scope.reverse = ($scope.sortmethod === sortmethod) ? !$scope.reverse :$scope.reverse;
		$scope.sortmethod = sortmethod;
		};
		
		$scope.createCustomer=function(){
			apiCall.createCustomer($scope.customer);
			$scope.customer={};
		};
		
		$scope.editCustomer = function(customer){
			apiCall.updateCustomer(customer);
		};
		
		$scope.deleteCustomer=function(id){
			apiCall.deleteCustomer(id);
		};
	}])
	.controller('OrderCtrl', ['$scope', 'apiCall', function($scope, apiCall){
		$scope.orders = apiCall.stuff;
		
		$scope.sortmethod='';
		$scope.reverse=false;		
		$scope.sort = function(sortmethod) {
		$scope.reverse = ($scope.sortmethod === sortmethod) ? !$scope.reverse :$scope.reverse;
		$scope.sortmethod = sortmethod;
		};
		
		$scope.createOrder=function(){
			apiCall.createOrder($scope.order);
		};
		
		$scope.editOrder=function(order){
			apiCall.updateOrder(order);
		};
		
		$scope.deleteOrder=function(id){
			apiCall.deleteOrder(id);
		};
	}])
	.controller('AddOrderCtrl', ['$scope', 'apiCall', function($scope, apiCall){
		apiCall.getProducts();
		$scope.products=apiCall.stuff;
	}])
