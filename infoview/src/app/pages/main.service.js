(function () {
    'use strict';

    angular
        .module('BlurAdmin.pages.dashboard')
        .factory('ReportTemplateService', ['$http', '$q', '$cacheFactory', '$rootScope', Service]);

    function Service($http, $q, $cacheFactory, $rootScope, $translate) {
        Date.prototype.isValid = function () {
            // An invalid date object returns NaN for getTime() and NaN is the only
            // object not strictly equal to itself.
            return this.getTime() === this.getTime();
        };

        var timestamp = new Date().getTime() - (31 * 24 * 60 * 60 * 1000);
        var today = new Date().getTime() + 140 * 1000;
        var isoString = new Date().toISOString().slice(0, 10);

        var pieData, trafficData, lineData, blurFeed;
        var service = {};
        service.GetPieData = function () { return pieData; }
        service.GetTrafficData= function () { return trafficData; }
        service.GetLineData = function () { return lineData; }
        service.GetRegKey = GetRegKey;
        service.GetCompanyDetails = GetCompanyDetails;
        service.GetAllUsers = GetAllUsers;

        $rootScope.$on('update', function () {
            console.log('someone said to update!');
            GetAllReports().then(function (data) {
                var reportsThisMonth = 0;
                var reportsToday = 0;
                var doneToday = 0;
                var doneThisMonth = 0;
                var reportTypes = {
                    "risk-report-form": 0,
                    "acc-report-form": 0,
                    "qualdev-report-form": 0,
                    "idea-report-form": 0,
                    "custom-report-form": 0
                }

                var reportDates = {};

                for (var i = 0; i < data.length; i++) {
                    data[i].reportdate = data[i].reportdate.replace(/\./g, '-');
                    var from = data[i].reportdate.split('-');
                    var curDate = new Date(from[2], from[1] - 1, from[0]);
                    var offset = new Date().getTimezoneOffset() * 60000;
                    var curIso = new Date(curDate - offset).toISOString().slice(0,10);

                    if (data[i].formtype != undefined && data[i].formtype != null) {
                        reportTypes[data[i].formtype] += 1;
                    }

                    if (curDate.isValid()) {
                        if (curDate.getTime() > timestamp && curDate.getTime() < today) {
                            reportsThisMonth++;
                            
                            if(reportDates[curIso] == undefined || reportDates[curIso] == null){
                                reportDates[curIso] = {};
                            }
                            if(reportDates[curIso].value == undefined || reportDates[curIso].value == null){
                                reportDates[curIso].value = 0;
                                reportDates[curIso].value0 = 0;
                                reportDates[curIso].value1 = 0;
                            }

                            if(data[i].state == 'new'){
                                reportDates[curIso].value+= 1;
                            } else if(data[i].state == 'in_work'){
                                reportDates[curIso].value0+= 1;
                            } else if(data[i].state == 'done'){
                                reportDates[curIso].value1+= 1;
                            }
                        }

                        if (isoString == curIso) {
                            reportsToday++;
                        }

                        if (data[i].state == 'done') {
                            if (curDate.getTime() > timestamp && curDate.getTime() < today) {
                                doneThisMonth++;
                            }

                            if (isoString == curIso) {
                                doneToday++;
                            }
                        }
                    }
                }

                lineData = reportDates;
                trafficData = reportTypes;

                GetAllUsers().then(function (users) {
                    pieData = {
                        reportsThisMonth: reportsThisMonth,
                        reportsToday: reportsToday,
                        doneThisMonth: doneThisMonth,
                        doneToday: doneToday,
                        users: users.length
                    }

                    $rootScope.$broadcast('update-ui');
                }).catch(function (err) {

                });
            }).catch(function (err) {

            });

        });

        function GetAllReports() {
            return $http.get('/api/resources/reports/').then(handleSuccess, handleError);
        }

        function GetAllLocations() {
            return $http.get('/api/resources/locations/').then(handleSuccess, handleError);
        }

        function GetReport(id) {
            return $http.get('/api/resources/reports/' + id).then(handleSuccess, handleError);
        }

        function GetRegKey() {
            return $http.get('/api/resources/regkey').then(handleSuccess, handleError);
        }

        function GetCompanyDetails() {
            return $http.get('/api/resources/company/details').then(handleSuccess, handleError);
        }

        function GetAllUsers() {
            return $http.get('/api/users', { cache: $rootScope.cacheUsers }).then(handleSuccess, handleError);
        }

        // private functions
        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }

        return service;
    }
})();