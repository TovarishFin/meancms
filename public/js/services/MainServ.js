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
			call.findOrdersByStatus = function(orderStatus){
				return $http.get('/api/orders/'+orderStatus).success(function(data){
					angular.copy(data, call.stuff);
				});
			};
			//send out payment info to server... callback in controller
			call.runPayment = function(order){
				return $http.post('/api/payments', order)
			};
					
		return call;
	}])
	.factory('toggleServ',[ function(){
		toggle={}
		toggle.paymentToggleState={
			"_id":true,
			"itemName":false,
			"pMethod":false,
			"itemPrice":false,
			"orderStatus":true,
			"cFname":false,
			"cLname":false,
			"ccNumber":false,
			"ccExpDate":false,
			"ccCode":false,
			"BtoAddr":false,
			"BtoCity":false,
			"BtoState":false,
			"BtoZip":false,
			"BtoCountry":false,
			"StoAddr":true,
			"StoCity":true,
			"StoState":true,
			"StoZip":true,
			"StoCountry":true,
			"cPhone":true,
			"orderID":true,
			"__v":true,
			"date":true
			};
		toggle.toggleShow=function(toggleVar){
			(toggle.paymentToggleState[toggleVar] ? toggle.paymentToggleState[toggleVar]=false : toggle.paymentToggleState[toggleVar]=true);
			};
		toggle.testobj={"test":false};
		toggle.test=function(test){
			(test ? test=false : test=true);
		};
		toggle.getToggleValues=function(mainData){
			toggle.toggleValues=Object.keys(mainData[0]);
		};
			
		return toggle;
	}])

