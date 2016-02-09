angular.module('MainAppServices',[])
	.factory('apiCall', ['$http', '$window', function($http, $window){
		var call = {
			//container for any returned data which is stored to scope
			products: [],
			customers:[],
			pMethods:[],
			orders:[],
			userInfo:[]
		};
			//api calls for products
			call.getProducts = function(){
				return $http.get('/reqauth/api/products').success(function(data){
				angular.copy(data, call.products);
				});
			};
			call.createProduct = function(product){
				return $http.post('/reqauth/api/products', product).success(function(data){
					call.products.push(data);
				});
			};
			call.updateProduct = function(product){
				return $http.post('/reqauth/api/products/update', product).success(function(data){
					call.getProducts();
				});
			};
			call.deleteProduct = function(id){
				return $http.post('/reqauth/api/products/delete',{'_id': id}).success(function(data){
					call.getProducts();
				});
			};
			//api calls for payment methods
			call.getPmethods = function(){
				return $http.get('/reqauth/api/pmethods').success(function(data){
					angular.copy(data, call.pMethods);
				});
			};
			call.createPmethod = function(pMethod){
				return $http.post('/reqauth/api/pmethods', pMethod).success(function(data){
					call.pMethods.push(data);
				});
			};
			call.updatePmethod = function(pMethod){
				return $http.post('/reqauth/api/pmethods/update', pMethod).success(function(data){
					call.getPmethods();
				});
			};
			call.deletePmethod = function(id){
				return $http.post('/reqauth/api/pmethods/delete', {'_id':id}).success(function(data){
					call.getPmethods();
				});
			};
			//api calls for customers
			call.getCustomers = function(){
				return $http.get('/reqauth/api/customers').success(function(data){
					angular.copy(data, call.customers);
				});
			};
			//removed promise... need to update others...
			call.createCustomer = function(customer){
				return $http.post('/reqauth/api/customers', customer)
			};
			call.updateCustomer = function(customer){
				return $http.post('/reqauth/api/customers/update', customer).success(function(data){
					call.getCustomers();
				});
			};
			call.deleteCustomer = function(id){
				return $http.post('/reqauth/api/customers/delete',{'_id': id}).success(function(data){
					call.getCustomers();
				});
			};
			// api calls for orders
			call.getOrders = function(){
				return $http.get('/reqauth/api/orders').success(function(data){
					angular.copy(data, call.orders);
				});
			};
			//moving promise to the controller... might want to do this for the rest...
			call.createOrder = function(newOrder){
				return $http.post('/reqauth/api/orders', newOrder)
			};
			call.updateOrder = function(order){
				return $http.post('/reqauth/api/orders/update', order).success(function(data){
					call.getOrders();
				});
			};
			call.deleteOrder = function(id){
				return $http.post('/reqauth/api/orders/delete',{'_id': id}).success(function(data){
					call.getOrders();
				});
			};
			call.getOrdersByStatus = function(orderStatus){
				return $http.get('/reqauth/api/orders/'+orderStatus).success(function(data){
					angular.copy(data, call.orders);
				});
			};
			//send out payment info to server... callback in controller
			call.runPayment = function(order){
				return $http.post('/reqauth/api/payments', order)
			};
			//send order approval to server... callback in controller
			call.approveOrder = function(order){
				return $http.post('/reqauth/api/orders/approve', order)
			};
			call.denyOrder = function(order){
				return $http.post('/reqauth/api/orders/deny', order)
			};
			//universal update orderStatus call... need to apply to other places where it should be used.
			//callback will be put in controllers
			call.updateOrderStatus=function(order, status){
				order.orderStatus=status;
				return $http.post('/reqauth/api/orders/newStatus', order)
			};
			call.getShippingLabel=function(order){
				$window.open('https://api.postmaster.io/'+order.sLabel);
			};
			call.createUser=function(newUser){
				return $http.post('/reqauth/api/users', newUser)
			};
			call.getUserInfo = function(){
				return $http.get('/reqauth/api/userinfo')
			};
					
		return call;
	}])
	.factory('toggleServ',[ function(){
		//initialized toggle object
		toggle={};
		//initialize state of views for payments
		toggle.paymentToggleState={
			"_id":true,
			"pMethod":false,
			"orderStatus":true,
			"cFname":false,
			"cLname":false,
			"ccNumber":true,
			"ccExpDate":true,
			"ccCode":true,
			"BtoAddr":false,
			"BtoCity":false,
			"BtoState":false,
			"BtoZip":false,
			"BtoCountry":false,
			"StoAddr":false,
			"StoCity":false,
			"StoState":false,
			"StoZip":false,
			"StoCountry":false,
			"cPhone":false,
			"orderID":true,
			"__v":true,
			"date":true,
			"pMethod": false,
			"_v":true,
			"_id": true,
			"user":true,
			"postID":true,
			"sLabel":true,
			"tNum":true,
			"prodName":true,
			"prodPrice":true
			};
		//initialize state of views for approvals	
		toggle.approveToggleState={
			"_id":true,
			"pMethod":false,
			"orderStatus":true,
			"cFname":false,
			"cLname":false,
			"ccNumber":true,
			"ccExpDate":true,
			"ccCode":true,
			"BtoAddr":false,
			"BtoCity":false,
			"BtoState":false,
			"BtoZip":false,
			"BtoCountry":false,
			"StoAddr":false,
			"StoCity":false,
			"StoState":false,
			"StoZip":false,
			"StoCountry":false,
			"cPhone":false,
			"orderID":true,
			"__v":true,
			"date":true,
			"pMethod": false,
			"_v":true,
			"_id": true,
			"user":true,
			"postID":true,
			"sLabel":true,
			"tNum":true,
			"prodName":true,
			"prodPrice":true
			};	
		toggle.printToggleState={
			"_id":true,
			"pMethod":false,
			"orderStatus":true,
			"cFname":false,
			"cLname":false,
			"ccNumber":true,
			"ccExpDate":true,
			"ccCode":true,
			"BtoAddr":false,
			"BtoCity":false,
			"BtoState":false,
			"BtoZip":false,
			"BtoCountry":false,
			"StoAddr":false,
			"StoCity":false,
			"StoState":false,
			"StoZip":false,
			"StoCountry":false,
			"cPhone":false,
			"orderID":true,
			"__v":true,
			"date":true,
			"pMethod": false,
			"_v":true,
			"_id": true,
			"user":true,
			"postID":true,
			"sLabel":true,
			"tNum":true,
			"prodName":true,
			"prodPrice":true
			};
		toggle.orderToggleState={
			"_id":true,
			"pMethod":false,
			"orderStatus":true,
			"cFname":false,
			"cLname":false,
			"ccNumber":true,
			"ccExpDate":true,
			"ccCode":true,
			"BtoAddr":false,
			"BtoCity":false,
			"BtoState":false,
			"BtoZip":false,
			"BtoCountry":false,
			"StoAddr":false,
			"StoCity":false,
			"StoState":false,
			"StoZip":false,
			"StoCountry":false,
			"cPhone":false,
			"orderID":true,
			"__v":true,
			"date":true,
			"pMethod": false,
			"_v":true,
			"_id": true,
			"user":true,
			"postID":true,
			"sLabel":true,
			"tNum":true,
			"prodName":true,
			"prodPrice":true
			};
		toggle.customerToggleState={
			"_id":true,
			"prodName":true,
			"pMethod":false,
			"prodPrice":true,
			"orderStatus":true,
			"cFname":false,
			"cLname":false,
			"ccNumber":true,
			"ccExpDate":true,
			"ccCode":true,
			"BtoAddr":false,
			"BtoCity":false,
			"BtoState":false,
			"BtoZip":false,
			"BtoCountry":false,
			"StoAddr":false,
			"StoCity":false,
			"StoState":false,
			"StoZip":false,
			"StoCountry":false,
			"cPhone":false,
			"orderID":true,
			"__v":true,
			"date":true,
			"pMethod": false,
			"_v":true,
			"_id": true
			};	
		//modify the toggle state, takes in keyword to identify which state to modify	
		toggle.toggleShow=function(toggleVar, stateMode){
			var state = function(stateMode){
				switch(stateMode){
					case 'approve':
						return toggle.approveToggleState;
						break;
					case 'payments':
						return toggle.paymentToggleState;
						break;
					case 'printorders':
						return toggle.printToggleState;
						break;
					case 'orders':
						return toggle.orderToggleState;
						break;
					case 'customers':
						return toggle.customerToggleState;
						break;
					};
				};
			(state(stateMode)[toggleVar] ? state(stateMode)[toggleVar]=false : state(stateMode)[toggleVar]=true);
			};
		//get toggle values for the tables
		toggle.getToggleValues=function(stateMode){
			switch(stateMode){
					case 'approve':
						toggle.toggleValues=Object.keys(toggle.approveToggleState);
						break;
					case 'payments':
						toggle.toggleValues=Object.keys(toggle.paymentToggleState);
						break;
					case 'printorders':
						toggle.toggleValues=Object.keys(toggle.printToggleState);
						break;
					case 'orders':
						toggle.toggleValues=Object.keys(toggle.orderToggleState);
						break;
					case 'customers':
						toggle.toggleValues=Object.keys(toggle.customerToggleState);
						break;
					};
			
			};
			
		return toggle;
	}])

