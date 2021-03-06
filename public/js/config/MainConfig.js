angular.module('MainAppConfig',['ui.router'])
	.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('home', {
				url:'/',
				templateUrl: 'html/home.html',
				controller: 'HomeCtrl'
			})
			.state('products', {
				url:'/products',
				templateUrl: 'html/products.html',
				controller: 'ProdCtrl',
				resolve: {
					products: ['apiCall', function(apiCall){
						return apiCall.getProducts();
					}]
				}
			})
			.state('pMethods', {
				url: '/pmethods',
				templateUrl: 'html/pmethods.html',
				controller: 'pMethodCtrl',
				resolve: {
					pMethods: ['apiCall', function(apiCall){
						return apiCall.getPmethods();
					}]
				}
			})
			.state('customers', {
				url: '/customers',
				templateUrl: 'html/customers.html',
				controller: 'CustomerCtrl',
				resolve: {
					customers: ['apiCall', function(apiCall){
						return apiCall.getCustomers();
					}]
				}
			})
			.state('orders', {
				url: '/orders',
				templateUrl: 'html/orders.html',
				controller: 'OrderCtrl',
				resolve: {
					orders: ['apiCall', function(apiCall){
						return apiCall.getOrders();
					}]
				}
			})
			.state('addorder', {
				url: '/addorder',
				templateUrl: 'html/addorder.html',
				controller: 'AddOrderCtrl',
			})
			.state('runPayments',{
				url: '/runpayments',
				templateUrl: 'html/runpayments.html',
				controller: 'PayCtrl',
				resolve: {
					orders: ['apiCall', function(apiCall){
						return apiCall.getOrdersByStatus(0);
					}]
				}
			})
			.state('approve', {
				url: '/approve',
				templateUrl: 'html/approve.html',
				controller: 'ApprCtrl',
				resolve: {
					orders: ['apiCall', function(apiCall){
						return apiCall.getOrdersByStatus(1);
					}]
				}
			})
			.state('printorders', {
				url: '/printorders',
				templateUrl: 'html/printorders.html',
				controller: 'PrintCtrl',
				resolve: {
					orders: ['apiCall', function(apiCall){
						return apiCall.getOrdersByStatus(3);
					}]
				}
			})
			.state('register', {
				url: '/register',
				templateUrl: 'html/register.html',
				controller: 'RegisterCtrl',
			})
			
	}]);
