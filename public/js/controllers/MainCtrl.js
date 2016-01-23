angular.module('MainAppController',[])
	.controller('HomeCtrl',['$scope', 'apiCall', function($scope, apiCall){
		$scope.test='testorino diddly doo';
	}])

	.controller('ProdCtrl', ['$scope', 'apiCall', function($scope, apiCall){
		$scope.products=apiCall.products;
		
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
		$scope.pMethods=apiCall.pMethods;
		
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
	.controller('CustomerCtrl', ['$scope', 'apiCall','toggleServ', function($scope, apiCall, toggleServ){
		$scope.customers=apiCall.customers;
		apiCall.getPmethods();
		$scope.pMethods=apiCall.pMethods;
		var stateMode='customers';
		toggleServ.getToggleValues(stateMode);
		//toggle functionality from services
		$scope.toggles=toggleServ.toggleValues;
		$scope.toggleState=toggleServ.customerToggleState;
		$scope.toggleShow=function(toggle){
			toggleServ.toggleShow(toggle, stateMode);
			$scope.toggleState=toggleServ.customerToggleState;
		};
		
		$scope.createCustomer=function(){
			if($scope.billingIsShipping){
				$scope.customer.StoAddr=$scope.customer.BtoAddr;
				$scope.customer.StoCity=$scope.customer.BtoCity;
				$scope.customer.StoZip=$scope.customer.BtoZip;
				$scope.customer.StoState=$scope.customer.BtoState;
				$scope.customer.StoCountry=$scope.customer.BtoCountry;
			};
			apiCall.createCustomer($scope.customer)
				.success(function(data){
					apiCall.customers.push(data);
				});
			$scope.customer={};
		};
		
		$scope.editCustomer = function(customer){
			apiCall.updateCustomer(customer);
		};
		
		$scope.deleteCustomer=function(id){
			apiCall.deleteCustomer(id);
		};
		
		$scope.billingIsShipping=false;
		$scope.billingIsShippingToggle=function(billingIsShipping){
			billingIsShipping ? $scope.billingIsShipping=false : $scope.billingIsShipping=true;
		};
	}])
	.controller('OrderCtrl', ['$scope', 'apiCall', 'toggleServ', function($scope, apiCall, toggleServ){
		$scope.orders = apiCall.orders;
		apiCall.getPmethods();
		$scope.pMethods = apiCall.pMethods;
		var stateMode='orders'
		toggleServ.getToggleValues(stateMode);
		//toggle functionality from services
		$scope.toggles=toggleServ.toggleValues;
		$scope.toggleState=toggleServ.orderToggleState;
		$scope.toggleShow=function(toggle){
			toggleServ.toggleShow(toggle, stateMode);
			$scope.toggleState=toggleServ.orderToggleState;
		};
		
		$scope.sortmethod='';
		$scope.reverse=false;		
		$scope.sort = function(sortmethod) {
		$scope.reverse = ($scope.sortmethod === sortmethod) ? !$scope.reverse :$scope.reverse;
		$scope.sortmethod = sortmethod;
		};
		
		$scope.createOrder=function(){
			apiCall.createOrder($scope.order)
				.success(function(data){
					apiCall.orders.push(data);
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
		$scope.products=apiCall.products;
		
		apiCall.getCustomers();
		$scope.customers=apiCall.customers;
		
		apiCall.getPmethods();
		$scope.pMethods=apiCall.pMethods;
		
		$scope.setOrderProduct=function(product){
			$scope.newOrder=product;
			$scope.result=null;
			$scope.customerResult=null;
			$scope.productSelected=product;
		};
		$scope.orderProcess={};
		$scope.orderProcess.step=1;
		
		$scope.setOrderCustomer=function(customer){
			$scope.customerSelected=customer
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
		};
		$scope.csNewCustomerOrder=function(customer){
			apiCall.createCustomer(customer)
				.success(function(data){
					$scope.customerResult=data;
				});
			};
		
	}])
	.controller('PayCtrl', ['$scope', 'apiCall', 'toggleServ', function($scope, apiCall, toggleServ){
		
		//call to get orders and also the view toggles that go with the recieved data...
		$scope.orders=apiCall.orders;
		var stateMode='payments';
		toggleServ.getToggleValues(stateMode);
		
		//toggle functionality from services
		$scope.toggles=toggleServ.toggleValues;
		$scope.toggleState=toggleServ.paymentToggleState;
		$scope.toggleShow=function(toggle){
			toggleServ.toggleShow(toggle, stateMode);
			$scope.toggleState=toggleServ.paymentToggleState;
		};
		
		//send run payment signal to the server
		$scope.runPayment=function(order){
			apiCall.runPayment(order)
				//still need to do something with this on page...
				.success(function(data){
					$scope.result=data;
				});
			apiCall.getOrdersByStatus(0);
		};
	}])
	.controller('ApprCtrl', ['$scope', 'apiCall', 'toggleServ', function($scope, apiCall, toggleServ){
		//call to get orders and also the view toggles that go with the recieved data...
		$scope.orders=apiCall.orders;
		var stateMode='approve'
		toggleServ.getToggleValues(stateMode);
		
		//toggle functionality from services
		$scope.toggles=toggleServ.toggleValues;
		$scope.toggleState=toggleServ.approveToggleState;
		$scope.toggleShow=function(toggle){
			toggleServ.toggleShow(toggle, stateMode);
			$scope.toggleState=toggleServ.approveToggleState;
		};
		//link up api calls to page...
		$scope.approveOrder=function(order){
			apiCall.approveOrder(order)
				//still need to do something with this on page...
				.success(function(data){
					$scope.result=data;
				});
			apiCall.getOrdersByStatus(1);
		};
		$scope.denyOrder=function(order){
			apiCall.denyOrder(order)
				//still need to do something with this on page...
				.success(function(data){
					$scope.result=data;
				});
			apiCall.getOrdersByStatus(1);
		};
		
	}]) 
	.controller('PrintCtrl', ['$scope', 'apiCall', 'toggleServ', function($scope, apiCall, toggleServ){
				//call to get orders and also the view toggles that go with the recieved data...
		$scope.orders=apiCall.orders;
		var stateMode='printorders';
		toggleServ.getToggleValues(stateMode);
		
		//toggle functionality from services
		$scope.toggles=toggleServ.toggleValues;
		$scope.toggleState=toggleServ.printToggleState;
		$scope.toggleShow=function(toggle){
			toggleServ.toggleShow(toggle, stateMode);
			$scope.toggleState=toggleServ.printToggleState;
		};
		//link up api calls to page...
		$scope.printOrder=function(order){
			apiCall.getShippingLabel(order)
			apiCall.updateOrderStatus(order, 4)
				.success(function(data){
					$scope.result=data;
				});
			apiCall.getOrdersByStatus(3);
		};
	}])
