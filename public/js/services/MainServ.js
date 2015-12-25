angular.module('MainAppServices',[])
	.factory('apiCall', ['$http', function($http){
		var call = {
			stuff: []
		};
			call.getProducts = function(){
				return $http.get('/api/products').success(function(data){
				angular.copy(data, call.stuff);
				});
			};
			call.createProduct = function(product){
				return $http.post('/api/products', product).success(function(data){
					call.stuff.push(data);
				});
			};
			call.updateProduct = function(product){
				return $http.post('/api/products/update', product).success(function(data){
					call.getProducts();
				});
			};
			call.deleteProduct = function(id){
				return $http.post('/api/products/delete',{'_id': id}).success(function(data){
					call.getProducts();
				});
			};
			call.getPmethods = function(){
				return $http.get('/api/pmethods').success(function(data){
					angular.copy(data, call.stuff);
				});
			};
			call.createPmethod = function(pMethod){
				return $http.post('/api/pmethods', pMethod).success(function(data){
					call.stuff.push(data);
				});
			};
			call.updatePmethod = function(pMethod){
				return $http.post('/api/pmethods/update', pMethod).success(function(data){
					call.getPmethods();
				});
			};
			call.deletePmethod = function(id){
				return $http.post('/api/pmethods/delete', {'_id':id}).success(function(data){
					call.getProducts();
				});
			};
			call.getCustomers = function(){
				return $http.get('/api/customers').success(function(data){
					angular.copy(data, call.stuff);
				});
			};
			call.createCustomer = function(customer){
				return $http.post('/api/customers', customer).success(function(data){
					call.stuff.push(data);
				});
			};
			call.updateCustomer = function(customer){
				return $http.post('/api/customers/update', customer).success(function(data){
					call.getCustomers();
				});
			};
			call.deleteCustomer = function(id){
				return $http.post('/api/customers/delete',{'_id': id}).success(function(data){
					call.getCustomers();
				});
			};
					
		return call;
}]);

