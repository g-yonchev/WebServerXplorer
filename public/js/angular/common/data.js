(function () {
    'use strict';

    function data($http, $q, baseServiceUrl) {

        function get(url, queryParams) {
            var defered = $q.defer();

            $http.get(baseServiceUrl + '/' + url, { params: queryParams})
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (error) {
                    defered.reject(error);
                });

            return defered.promise;
        }

        return {
            get: get
        };
    }

    angular.module('myApp.services')
        .factory('data', ['$http', '$q', 'baseServiceUrl', data])
}())