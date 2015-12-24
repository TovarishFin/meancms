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
	}]);
