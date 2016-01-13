(function () {
    'use strict';

    function config() {
    }

    angular.module('myApp.services', []);
    angular.module('myApp.controllers', ['myApp.services']);
    angular.module('myApp', ['ngRoute', 'ngCookies', 'myApp.controllers']).
        config(['$routeProvider', config])
        .constant('baseServiceUrl', 'http://localhost:3000');
}());