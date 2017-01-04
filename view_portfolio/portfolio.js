'use strict';
angular.module('appResume.portfolio', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/portfolio', {
		templateUrl: 'view_portfolio/portfolio.html',
		controller: 'portfolioCtrl'
	});
}])
.controller('portfolioCtrl', ['$scope','$http','$routeParams','$location','$window','$timeout','$compile','$filter', function($scope,$http,$routeParams,$location,$window,$timeout,$compile,$filter) {
	$scope.portfolio = [];
	$scope.loadPorfolio = function(){
		$http.get('portfolio.json').success(function(data){
			$scope.portfolio = data;
		});
	}
	if ($routeParams.id) {
		$http({
			method: 'GET',
			url: 'portfolio.json',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		.then(function(result) {
			$timeout(function(){
				$scope.$apply(function () {
					var $data = result.data;
					angular.forEach($data, function(item) {
						item.img = [];						
						for (var i = 1; i <= item.images; i++) {
							item.img[i] = "img/portfolio/" + item.folder + "/" + i + ".png";
						}
					});
					$scope.portfolio_item = result.data[$routeParams.id - 1];
					
					$scope.portfolio_item.prev = parseInt($routeParams.id) - 1;
					$scope.portfolio_item.next = parseInt($routeParams.id) + 1;

					if (($routeParams.id - 1) <= 0 ) {
						$scope.portfolio_item.prev = result.data.length;
					}
					if ($routeParams.id >= result.data.length) {
						$scope.portfolio_item.next = 1;
					}
				});
			},10);
		}, function(error) {
			console.error(error);
		});
	}
}]);