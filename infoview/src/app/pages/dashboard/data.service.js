(function () {
    'use strict';
    angular.module('BlurAdmin.pages.dashboard')
        .service('dataService', dataService);

    function dataService($http, $q) {

        var service = {};
        service.getDayInfo = getDayInfo;
        service.getYesterday = getYesterday;
        service.getMonth = getMonth;
        service.getWeekPop = getWeekPop;
        service.getMostPop = getMostPop;
        service.getPredictions = getPredictions;

        function getPredictions(){
            var date = new Date("2016-12-13T00:00:00.000Z")
            return $http.get('/dishes/statistics/?timestamp=' + date.getTime()).then(handleSuccess, handleError);
        }

        function getDayInfo(){
           return $http.get('/portions/').then(handleSuccess,handleError);
        }

        function getMostPop(){
            return $http.get('/dishes/common/?limit=5').then(handleSuccess,handleError);
        }

        function getWeekPop(){
            return $http.get('/dishes/week/').then(handleSuccess,handleError);
        }

        function getYesterday(){
            return $http.post('/dishes/dates/',{"end":"2016-12-13T00:00:00.000Z","start":"2016-12-12T00:00:00.000Z"}).then(handleSuccess,handleError);
        }

        function getMonth(){
            return $http.post('/portions/dates/',{"end":"2016-12-12T00:00:00.000Z","start":"2016-11-11T00:00:00.000Z"}).then(handleSuccess,handleError);
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