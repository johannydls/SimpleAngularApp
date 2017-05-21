var myapp = angular.module('myapp', []);

myapp.controller('productController', function($scope) {

	$scope.listProducts = [
		{ id: 'p01', name: 'Product 1', price: 1},
		{ id: 'p02', name: 'Product 2', price: 2},
		{ id: 'p03', name: 'Product 3', price: 3},
		{ id: 'p04', name: 'Product 4', price: 4}
	];

	$scope.listCarrinho = [];

	$scope.add = function() {
		$scope.listProducts.push(
			{
				id: $scope.idTb,
				name: $scope.nameTb,
				price: $scope.priceTb
			}
		);
	};

	function calculaTotal() {
		var total = 0;
		for(var i=0; i < $scope.listCarrinho.length; i++)
			total += $scope.listCarrinho[i].totalPrice;
		return total;
	};

	$scope.addOne = function(id) {
		var index = getItemCarrinho(id);
		var product = $scope.listCarrinho[index];

		$scope.listCarrinho[index].quantity += 1;
		$scope.listCarrinho[index].totalPrice = product.price * $scope.listCarrinho[index].quantity;

		$scope.totalCarrinho = calculaTotal();

	};

	$scope.removeOne = function(id) {
		var index = getItemCarrinho(id);
		var product = $scope.listCarrinho[index];

		if ($scope.listCarrinho[index].quantity == 1) {
			$scope.listCarrinho.splice(index, 1);
		
		} else {
			$scope.listCarrinho[index].quantity -= 1;
			$scope.listCarrinho[index].totalPrice = product.price * $scope.listCarrinho[index].quantity;
		}

		$scope.totalCarrinho = calculaTotal();

	};

	$scope.addCarrinho = function(id) {
		var index = getSelectedIndex(id);
		var product = $scope.listProducts[index];

		if(getItemCarrinho(id) == -1) {
			$scope.listCarrinho.push(
				{
					id: product.id,
					name: product.name,
					price: product.price,
					quantity: 1,
					totalPrice: product.price
				}
			);
		} else {
			$scope.listCarrinho[index].quantity += 1;
			$scope.listCarrinho[index].totalPrice = product.price * $scope.listCarrinho[index].quantity;
		}

		$scope.totalCarrinho = calculaTotal();


	};

	$scope.edit = function() {
		var index = getSelectedIndex($scope.idTb);
		$scope.listProducts[index].id = $scope.idTb;
		$scope.listProducts[index].name = $scope.nameTb;
		$scope.listProducts[index].price = $scope.priceTb;
		$scope.listProducts[index].quantity = $scope.quantityTb;

	};

	$scope.selectEdit = function(id) {

		var index = getSelectedIndex(id);
		var product = $scope.listProducts[index];

		$scope.idTb = product.id;
		$scope.nameTb = product.name;
		$scope.priceTb = product.price;
		$scope.quantityTb = product.quantity;

	};

	$scope.del = function(id) {
		var result = confirm('Você tem certeza?');

		if(result == true) {
			var index = getSelectedIndex(id);
			$scope.listProducts.splice(index, 1);
		}

	};

	$scope.limparCarrinho = function() {
		$scope.listCarrinho = [];
		$scope.totalCarrinho = 0;
	}

	function getSelectedIndex(id) {
		for (var i = 0; i < $scope.listProducts.length; i++) {
			if ($scope.listProducts[i].id == id)
				return i;
		}
		
		return -1;
	};

	function getItemCarrinho(id) {
		for (var i = 0; i < $scope.listCarrinho.length; i++) {
			if ($scope.listCarrinho[i].id == id)
				return i;
		}
		return -1;
	}
});