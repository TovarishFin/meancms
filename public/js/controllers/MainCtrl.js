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
			apiCall.createCustomer($scope.customer)
				.success(function(data){
					call.stuff.push(data);
				});
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
			apiCall.createOrder($scope.order)
				.success(function(data){
					apiCall.stuff.push(data);
				});
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
		
		apiCall.getCustomers2();
		$scope.customers=apiCall.stuff2;
		
		$scope.setOrderProduct=function(product){
			$scope.newOrder=product;
			$scope.result=null;
			$scope.productSelected=product;
		};
		$scope.orderProcess={};
		$scope.orderProcess.step=1;
		
		$scope.setOrderCustomer=function(id){
			$scope.customerSelected=id
			$scope.orderProcess.step=2;
		};
		
		$scope.csNewOrder=function(customer, newOrder){
			for (var x in customer){
				newOrder[x]=customer[x];
				delete newOrder['_id'];
			};
			apiCall.createOrder(newOrder)
				.success(function(data){
					$scope.result=data;
					$scope.newOrder=null;
					$scope.productSelected=null;
					$scope.customerSelected=null;
					$scope.orderProcess.step=1;
					$scope.customerSearchText=null;
				});
			apiCall.createCustomer(customer)
				.success(function(data){
					$scope.customerResult=data;
				});
		};
		
	}])
