var myapp = angular.module('myapp2', []);

myapp.controller('productController', function($scope){

	$scope.listProducts = [
		{ id: 'p01', name: 'Product 1', price: 100, quantity: 20 },
		{ id: 'p02', name: 'Product 2', price: 200, quantity: 30 },
		{ id: 'p03', name: 'Product 3', price: 300, quantity: 40 },
		{ id: 'p04', name: 'Product 4', price: 400, quantity: 50 }
	];

	$scope.selectEdit = function(id) {
		var index = getSelectedIndex(id);
		var product = $scope.listProducts[index];

		$scope.idTb = product.id;
		$scope.nameTb = product.name;
		$scope.priceTb = product.price;
		$scope.quantityTb = product.quantity;

	};

	$scope.del = function(id) {
		var index = getSelectedIndex(id);
		$scope.listProducts.splice(index, 1);
	};

	function getSelectedIndex(id) {
		for (var i = 0; i < $scope.listProducts.length; i++)
			if ($scope.listProducts[i].id == id)
				return i;
			return -1;
	}
});