(function () {
    'use strict';
    angular.module('BlurAdmin.pages.dashboard')
        .service('dataService', dataService);

    function dataService($http, $q) {

        var service = {};
        service.getDayInfo = getDayInfo;

        function getDayInfo(){
           return $http.get('/portions/').then(handleSuccess,handleError);
        }

        function getSomethingElse(){
            return $http.get('/portions/').then(handleSuccess,handleError);
        }

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }


        return service;
    }
})();