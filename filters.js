'use strict';

/* Filters */
angular.module('appResume.filters', []).
	filter('to_trusted', ['$sce', function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}]).
	filter('url_encode', function(){
		return function(text) {
			return encodeURIComponent(text);
		};
	}).
	filter('length', function () {
		return function(data, $scope) {
			if($scope.isEmpty(data)){
				return false;
			} else {
				return true;
			}
		}
	}).
	filter('newlines', function () {
		return function(text) {
			//return text.replace(/\n/g, '<br/>');
			return text.replace(/(?:\r\n|\r|\n)/g, '<br />');
		}
	}).
	filter('noHTML', function () {
		return function(text) {
			return text
			.replace(/&/g, '&amp;')
			.replace(/>/g, '&gt;')
			.replace(/</g, '&lt;');
		}
	}).
	filter('strip_tags', function () {
		return function(input, allowed){
			allowed = (((allowed || '') + '')
				.toLowerCase()
				.match(/<[a-z][a-z0-9]*>/g) || [])
				.join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
			
			var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
				commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
			
			return input.replace(commentsAndPhpTags, '')
				.replace(tags, function ($0, $1) {
					return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
				});
		}
	}).
	filter('truncate', function () {
		return function(str,length) {
			if(str.length > length){
				str = str.substring(0,length)+"...";
			}
			console.log(str); 
			return str;
		}
	})