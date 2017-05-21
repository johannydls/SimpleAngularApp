var myapp = angular.module('myapp', []);

myapp.controller('productController', function($scope) {

	$scope.listProducts = [
		{ id: 'p01', name: 'Product 1', price: 100, quantity: 20 },
		{ id: 'p02', name: 'Product 2', price: 200, quantity: 30 },
		{ id: 'p03', name: 'Product 3', price: 300, quantity: 40 },
		{ id: 'p04', name: 'Product 4', price: 400, quantity: 50 }
	];

	$scope.listCarrinho = [
		{id:'p01', name: 'Product 1', price: 100, quantity:1}
	];

	$scope.add = function() {
		$scope.listProducts.push(
			{
				id: $scope.idTb,
				name: $scope.nameTb,
				price: $scope.priceTb,
				quantity: $scope.quantityTb
			}
		);
	};

	/*$scope.calculaTotal = function() {
		var total = 0;
		for(var i=0; i < $scope.listCarrinho.length; i++)
			total += $scope.listCarrinho[i].price;
		return total;
	};*/

	/*$scope.addCarrinho = function(id) {
		var index = getSelectedIndex(id);
		var product = $scope.listProducts[index];

		$scope.listCarrinho.push(

				{id: product.id, 
				 name: product.name,
				 price: product.price,
				 quantity: 1
				}

			);

		$scope.totalCarrinho = 10;
		/*if(listCarrinho.indexOf(product) == -1) {
			$scope.listCarrinho.push(
				{
					id: product.id,
					name: product.name,
					price: product.price,
					quantity: 1
				}
			);
		} else {
			$scope.listCarrinho[index].quantity += 1;
			$scope.listCarrinho[index].price *= $scope.listCarrinho[index].quantity;
		}


	};*/

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

	function getSelectedIndex(id) {
		for(var i=0; i < $scope.listProducts.length; i++) {
			if($scope.listProducts[i].id == id)
				return i;
			return -1;
		}
	}
});