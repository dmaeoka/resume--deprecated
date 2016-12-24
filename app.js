'use strict';

// Declare app level module which depends on views, and components
angular.module('appResume', [
	'ngRoute',
	'ngSanitize',
	'leaflet-directive',
	'appResume.main',
	'appResume.directives',
	'appResume.filters',
	'appResume.header',
	'appResume.portfolio',
	'appResume.portfolio_single',
	'appResume.contact',
])
.config(['$httpProvider','$locationProvider', '$routeProvider', function($httpProvider,$locationProvider, $routeProvider) {
	$locationProvider.hashPrefix('!');

	$routeProvider.otherwise({redirectTo: '/main'});
	//configura o RESPONSE interceptor, usado para exibir o ícone de acesso ao servidor
	// e a exibir uma mensagem de erro caso o servidor retorne algum erro
	$httpProvider.interceptors.push(function($q,$rootScope) {
		return function(promise) {
			//Always disable loader
			$rootScope.hideLoader();
			return promise.then(function(response) {
						// do something on success
						return(response);
				}, function(response) {
						// do something on error
						var $data = response.data;
						var $error = $data.error;				
						if ($error && $error.text)
							console.log("ERROR: " + $error.text);
						else{
							if (response.status=404)
								console.log("Erro ao acessar servidor. Página não encontrada. Veja o log de erros para maiores detalhes");
							else
								console.log("ERRO! veja o log do console");
						}
						return $q.reject(response);
				});
		}
	});
	// Use x-www-form-urlencoded Content-Type
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

	// Override $http service's default transformRequest
	$httpProvider.defaults.transformRequest = [function(data){
		/**
		 * The workhorse; converts an object to x-www-form-urlencoded serialization.
		 * @param {Object} obj
		 * @return {String}*/
		  
		var param = function(obj)
		{
			var query = '';
			var name, value, fullSubName, subName, subValue, innerObj, i;
			
			for(name in obj)
			{
				value = obj[name];
				
				if(value instanceof Array)
				{
					for(i=0; i<value.length; ++i)
					{
						subValue = value[i];
						fullSubName = name + '[' + i + ']';
						innerObj = {};
						innerObj[fullSubName] = subValue;
						query += param(innerObj) + '&';
					}
				}
				else if(value instanceof Object)
				{
					for(subName in value)
					{
						subValue = value[subName];
						fullSubName = name + '[' + subName + ']';
						innerObj = {};
						innerObj[fullSubName] = subValue;
						query += param(innerObj) + '&';
					}
				}
				else if(value !== undefined && value !== null)
				{
					query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
				}
			}
			
			return query.length ? query.substr(0, query.length - 1) : query;
		};
		
		return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
	}];
}])
.run(function($rootScope){
	//Uma flag que define se o ícone de acesso ao servidor deve estar ativado
	$rootScope.showLoaderFlag = false;
	//Força que o ícone de acesso ao servidor seja ativado
	$rootScope.showLoader = function(){
		$rootScope.showLoaderFlag = true;
	}
	//Força que o ícone de acesso ao servidor seja desativado
	$rootScope.hideLoader = function(){
		$rootScope.showLoaderFlag = false;
	}
	$rootScope.isNotEmpty = function(str){
		if (str) {
			str = str.replace(/ /g,'');
			if (str == '') {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}
});