(function () {
    'use strict';

    function config($routeProvider) {
        var PARTIALS_PREFIX = 'views/partials/';
        var CONTROLLER_AS_VIEW_MODEL = 'vm';
    }

    angular.module('myApp.services', []);
    angular.module('myApp.controllers', ['myApp.services']);
    angular.module('myApp', ['ngRoute', 'ngCookies', 'myApp.controllers']).
        config(['$routeProvider', config])
        .constant('baseServiceUrl', 'http://localhost:3000');
}());