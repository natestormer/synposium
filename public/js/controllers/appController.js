var app = angular.module('synposium', ['ngRoute']);

app.config(frameworkRouter);

// Router

function frameworkRouter($routeProvider)
{
	$routeProvider
		.when('/', {templateUrl: 'partials/home.html'})
		.when('/front-end-coding-standards', {templateUrl: 'partials/coding-standards.html'})
		.when('/syn-mixins', {templateUrl: 'partials/syn-mixins.html'});
}

// Navigation toggle

app.controller('headerController', ['$scope', function($scope)
{
	$scope.showNav = false; // set to false to hide on load
}]);