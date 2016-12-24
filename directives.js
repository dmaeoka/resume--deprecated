'use strict';

/* Directives */
angular.module('appResume.directives', []).
	directive('appVersion', ['version', function(version) {
		return function(scope, elm, attrs) {
			elm.text(version);
		};
	}])
	.directive('errSrc',['$timeout', function ($timeout) {
		"use strict";		
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.bind('error', function() {
					if (attrs.src != attrs.errSrc) {
						attrs.$set('src', attrs.errSrc);
					}
				});
				attrs.$observe('ngSrc', function(value) {
					if (!value && attrs.errSrc) {
						attrs.$set('src', attrs.errSrc);
					}
				});
			}
		};
	}])
	.directive('resize', function ($window) {
		return function (scope, element) {
			var w = angular.element($window);
			var h = angular.element($window);
			scope.getWindowDimensions = function () {
				return {
					'h': w.height(),
					'w': w.width()
				};
			};
			scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
				scope.windowHeight = newValue.h;
				scope.windowWidth = newValue.w;

				if(scope.windowWidth >= 758){
					scope.style = function (i) {
						return {
							'height': (newValue.h - 120 - i) + 'px'
						};
					}
				} else {
					scope.style = function (i) {
						return {
							'height': (newValue.h - 60 - i) + 'px'
						};
					};
				}

			}, true);

			w.bind('resize', function () {
				scope.$apply();
			});
		}
	})
	.directive('file', function() {
		return {
			restrict: 'E',
			template: '<input type="file" />',
			replace: true,
			require: 'ngModel',
			link: function(scope, element, attr, ctrl) {
				var listener = function() {
					scope.$apply(function() {
						attr.multiple ? ctrl.$setViewValue(element[0].files) : ctrl.$setViewValue(element[0].files[0]);
					});
				}
				element.bind('change', listener);
			}
		}
	})
	.directive('owlCarousel',['$timeout', function ($timeout) {
		"use strict";		
		return {
			restrict: 'C',
			link: function(scope, element, attrs) {
				$timeout(function () {
					$(element).owlCarousel({
						navigation : false,
						slideSpeed : 300,
						paginationSpeed : 400,      
						responsiveRefreshRate : 200,
						responsiveBaseWidth: window,
						pagination: true,
						singleItem: true   
					});
				}, 0);
			}
		};
	}])
	.directive('percentage',['$timeout', function ($timeout) {
		"use strict";		
		return {
			restrict: 'C',
			link: function(scope, element, attrs) {
				$timeout(function () {
					$(element).each(function(){
						var width= $(this).text();
						$(this).css("width", width).empty();
					});
				}, 0);
			}
		};
	}])
	.directive('box',['$timeout', function ($timeout) {
		"use strict";		
		return {
			restrict: 'C',
			link: function(scope, element, attrs) {
				$timeout(function () {
					$(element).magnificPopup({
						type: 'image',
						fixedContentPos: false,
						fixedBgPos: false,
						mainClass: 'mfp-no-margins mfp-with-zoom',
						image: {
							verticalFit: true
						},
						zoom: {
							enabled: true,
							duration: 300
						}
					});
				}, 0);
			}
		};
	}])
	.directive('box-iframe',['$timeout', function ($timeout) {
		"use strict";
		return {
			restrict: 'C',
			link: function(scope, element, attrs) {
				$timeout(function () {
					alert();
					$(element).magnificPopup({
						disableOn: 700,
						type: 'iframe',
						mainClass: 'mfp-fade',
						removalDelay: 160,
						preloader: false,

						fixedContentPos: false
					});
				}, 0);
			}
		};
	}])