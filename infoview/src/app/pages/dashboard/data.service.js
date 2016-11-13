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

        function getYesterday(){
            return $http.post('/dishes/dates/',{"end":"2016-12-12T00:00:00.000Z","start":"2016-12-13T00:00:00.000Z"}).then(handleSuccess,handleError);
        }

        function getMonth(){
            return $http.post('/portions/dates/',{"end":"2016-11-11T00:00:00.000Z","start":"2016-12-12T00:00:00.000Z"}).then(handleSuccess,handleError);
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