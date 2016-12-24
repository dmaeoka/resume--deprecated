'use strict';
angular.module('appResume.header', [])
.controller('headerCtrl', ['$scope','$http','$routeParams','$location','$window','$timeout','$compile','$filter', function($scope,$http,$routeParams,$location,$window,$timeout,$compile,$filter) {
	console.log('headerCtrl');
	/*MENU*/
	$scope.loadMenu = function(){
		$http.get('menu.json').success(function(data){
			// se houver resultado exiba
			if(data != ""){
				angular.forEach(data, function(item) {
					item.url = "#!/"+item.url
				});
				$scope.menu = data;
			} else {
				$scope.showError("Erro ao carregar menu");
			}
		});

		$scope.isActive = function (viewLocation) {
			var path = ($location.path()).split("/");
			path = path[1];
			viewLocation = viewLocation.split("/");
			viewLocation = viewLocation[1];

			return viewLocation === path;
		};
	}
}]);