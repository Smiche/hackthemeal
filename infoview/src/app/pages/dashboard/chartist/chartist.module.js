/**
 * @author a.demeshko
 * created on 12/17/15
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
    .directive('chartistChart', dashboardLineChart);

  /** @ngInject */
  function dashboardLineChart() {
    return {
      restrict: 'E',
      controller: 'chartistCtrl',
      templateUrl: 'app/pages/dashboard/chartist/chartist.html'
    };
  }

})();