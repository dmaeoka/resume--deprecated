'use strict';
angular.module('appResume.portfolio_single', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/portfolio/:id', {
		templateUrl: 'view_project_single/project_single.html',
		controller: 'portfolioCtrl',
	});
}])