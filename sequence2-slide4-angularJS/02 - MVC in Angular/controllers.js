angular.module('myModule').controller('ProductsController',function($scope){


	$scope.products = [
		new Product('Product1','Description1',256),
		new Product('Product2','Description2',512),
		new Product('Product3','Description3',23),
		new Product('Product4','Description4',15),
		new Product('Product5','Description5',89),
	];

	$scope.orderBy = "";
	$scope.limitTo = $scope.products.length;
	$scope.query   = "";

	$scope.addProduct = function(){
		this.products.push(this.product);
		this.product = {};
		$('#addProductModal').modal('hide');
	};

	$scope.deleteProduct = function(index){
		if(index <= -1) return;
		this.products.splice(index,1);
	};

});