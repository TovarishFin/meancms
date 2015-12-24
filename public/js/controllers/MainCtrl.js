angular.module('MainAppController',[])
	.controller('HomeCtrl',['$scope', function($scope){
		$scope.test='testorino diddly doo';
	}])

	.controller('ProdCtrl', ['$scope', 'apiCall', function($scope, apiCall){
		$scope.products=apiCall.stuff;
		
		$scope.sortmethod='prodName';
		$scope.reverse=false;		
		$scope.sort = function(sortmethod) {
		$scope.reverse = ($scope.sortmethod === sortmethod) ? !$scope.reverse :$scope.reverse;
		$scope.sortmethod = sortmethod;
		};
		
		$scope.createProduct=function(){
			apiCall.createProduct($scope.product);
			$scope.product={};
		};
		$scope.deleteProduct=function(id){
			apiCall.deleteProduct(id);
			apiCall.getProducts();
		};
	}])
	.controller('pMethodCtrl',['$scope', 'apiCall',function($scope, apiCall){
		$scope.pMethods=apiCall.stuff;
		
		$scope.sortmethod='type';
		$scope.reverse=false;		
		$scope.sort = function(sortmethod) {
		$scope.reverse = ($scope.sortmethod === sortmethod) ? !$scope.reverse :$scope.reverse;
		$scope.sortmethod = sortmethod;
		};
		
		$scope.createPmethod=function(){
			apiCall.createPmethod($scope.pMethod);
			$scope.pMethod={};
		};
		$scope.deletePmethod=function(id){
			apiCall.deletePmethod(id);
			apiCall.getPmethods();
		};
		
		
	}]);
