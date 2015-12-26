angular.module('MainAppServices',[])
	.factory('apiCall', ['$http', function($http){
		var call = {
			//container for any returned data which is stored to scope
			stuff: [],
			stuff2: []
		};
			//api calls for products
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
			//api calls for payment methods
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
					call.getPmethods();
				});
			};
			//api calls for customers
			call.getCustomers = function(){
				return $http.get('/api/customers').success(function(data){
					angular.copy(data, call.stuff);
				});
			};
			//had to add another due to needing two services on one page... better way to do this???
			call.getCustomers2 = function(){
				return $http.get('/api/customers').success(function(data){
					angular.copy(data, call.stuff2);
				});
			};
			//removed promise... need to update others...
			call.createCustomer = function(customer){
				return $http.post('/api/customers', customer)
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
			// api calls for orders
			call.getOrders = function(){
				return $http.get('/api/orders').success(function(data){
					angular.copy(data, call.stuff);
				});
			};
			//moving promise to the controller... might want to do this for the rest...
			call.createOrder = function(order){
				return $http.post('/api/orders', order)
			};
			call.updateOrder = function(order){
				return $http.post('/api/orders/update', order).success(function(data){
					call.getOrders();
				});
			};
			call.deleteOrder = function(id){
				return $http.post('/api/orders/delete',{'_id': id}).success(function(data){
					call.getOrders();
				});
			};
					
		return call;
}]);

