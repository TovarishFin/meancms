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
			call.deleteProduct = function(id){
				return $http.post('/api/products/delete',{'_id': id}).success(function(data){
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
			call.deletePmethod = function(id){
				return $http.post('/api/pmethods/delete', {'_id':id}).success(function(data){
				});
			};
					
		return call;
}]);

