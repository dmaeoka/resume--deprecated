'use strict';
angular.module('appResume.main', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/main', {
		templateUrl: 'view_main/main.html',
		controller: 'mainCtrl'
	});
}])
.controller('mainCtrl', [function() {
	console.log('mainCtrl');

}]);