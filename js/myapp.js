'use strict';

var myapp = angular.module('myapp', []);

myapp.controller('productController', function($scope, $http) {

	$scope.listProducts = [];

	$scope.listCarrinho = [];

	//Recupera os produtos de um arquivo JSON
	$http({
		url:'resources/dados.json',
		dataType: 'json',
		method: 'GET',
		data: '',
		headers: {
			"Content-type": "application/json; charset=utf-8"
		}
	}).then(function(response) {
		$scope.listProducts = response.data.produtos;
	});

	//Função que adiciona mais um item do mesmo no carrinho
	$scope.addOne = function(id) {
		var index = getItemCarrinho(id);
		var product = $scope.listCarrinho[index];

		$scope.listCarrinho[index].quantity += 1;
		$scope.listCarrinho[index].totalPrice = product.price * $scope.listCarrinho[index].quantity;

		$scope.totalCarrinho = calculaTotal();

	};

	//Função que remove um item do carrinho
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

	//Função que adiciona o item da lista de produtos ao carrinho
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

	//Função para limpar o carrinho ao finalizar a compra
	$scope.limparCarrinho = function() {
		$scope.listCarrinho = [];
		$scope.totalCarrinho = 0;
	}

	//Função que filtra a lista de produtos por categoria
	$scope.filterBy = function(categoria) {
		$scope.myFilter = categoria;
	}

	//Função de ordenação da tabela de produtos
	$scope.orderByMe = function(x) {
		$scope.myOrderBy = x;
	}

	//Função que retorna o indice do item selecionado da lista de produtos
	function getSelectedIndex(id) {
		for (var i = 0; i < $scope.listProducts.length; i++) {
			if ($scope.listProducts[i].id == id)
				return i;
		}
		return -1;
	};

	//Função que calcula o valor total do carrinho
	function calculaTotal() {
		var total = 0;
		for(var i=0; i < $scope.listCarrinho.length; i++)
			total += $scope.listCarrinho[i].totalPrice;
		return parseFloat(total.toFixed(2));
	};

	//Função que retorna o indice do item selecionado do carrinho
	function getItemCarrinho(id) {
		for (var i = 0; i < $scope.listCarrinho.length; i++) {
			if ($scope.listCarrinho[i].id == id)
				return i;
		}
		return -1;
	}
});