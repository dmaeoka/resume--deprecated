'use strict';
angular.module('appResume.contact', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/contact', {
		templateUrl: 'view_contact/contact.html',
		controller: 'contactCtrl'
	});
}])
.controller('contactCtrl', [ "$scope", "$http","$routeParams","$location","$timeout","$interval","$filter","$window","leafletEvents", function($scope,$http,$routeParams,$location,$timeout,$interval,$filter,$window,leafletEvents) {
	console.log('contactCtrl');
	var mapEvents = leafletEvents.getAvailableMapEvents();
	var tilesDict = {
        openstreetmap: {
            url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            options: {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
        },
        opencyclemap: {
            url: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
            options: {
                attribution: 'All maps &copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, map data &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright">ODbL</a>'
            }
        }
    };
	angular.extend($scope, {
		center: {
			lat: -25.4407893,
			lng: -49.2284037,
			zoom: 15
		},
		defaults: defaults,
		events: {
			map: {
				enable: mapEvents,
				logic: 'emit'
			}
		},
		controls: {custom: [
				L.control.locate({ 
					icon:'icon-compass',
					iconLoading:'fa fa-refresh fa-spin',
					strings: {
						title: "Mostrar minha localização",
						popup: "Você está a {distance} {unit} daqui.",
						outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
					},
					follow: true })
			]
		},
		markers: [{
			lat : -25.4407893,
			lng : -49.2284037,
			icon : icons['default_icon'],
		}],
		tiles: tilesDict.openstreetmap,
	});
}]);