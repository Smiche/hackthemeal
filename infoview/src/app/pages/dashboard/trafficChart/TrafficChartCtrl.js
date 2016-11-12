/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
    .controller('TrafficChartCtrl', TrafficChartCtrl);

  /** @ngInject */
  function TrafficChartCtrl($scope, baConfig, colorHelper, $rootScope, ReportTemplateService) {

    $rootScope.$on('update-ui', function () {
      var data = ReportTemplateService.GetTrafficData();
      var sum = 0;
      for (var key in data) {
        sum += data[key]
      }

      $scope.total = sum;

      $scope.doughnutData[0].value = data["acc-report-form"];
      $scope.doughnutData[1].value = data["risk-report-form"];
      $scope.doughnutData[2].value = data["idea-report-form"];
      $scope.doughnutData[3].value = data["qualdev-report-form"];
      $scope.doughnutData[4].value = data["custom-report-form"];

      $scope.doughnutData[0].percentage = (100 * data["acc-report-form"] / sum).toFixed(2);
      $scope.doughnutData[1].percentage = (100 * data["risk-report-form"] / sum).toFixed(2);
      $scope.doughnutData[2].percentage = (100 * data["idea-report-form"] / sum).toFixed(2);
      $scope.doughnutData[3].percentage = (100 * data["qualdev-report-form"] / sum).toFixed(2);
      $scope.doughnutData[4].percentage = (100 * data["custom-report-form"] / sum).toFixed(2);

      var ctx = document.getElementById('chart-area').getContext('2d');
      window.myDoughnut.destroy();
      window.myDoughnut = new Chart(ctx).Doughnut($scope.doughnutData, {
        segmentShowStroke: false,
        percentageInnerCutout: 64,
        responsive: true
      });

    });

    $scope.transparent = baConfig.theme.blur;
    var dashboardColors = baConfig.colors.dashboard;
    $scope.doughnutData = [
      {
        value: 36,
        color: dashboardColors.white,
        highlight: colorHelper.shade(dashboardColors.white, 15),
        label: 'Meat',
        percentage: 36,
        order: 1,
      }, {
        value: 27,
        color: dashboardColors.blueStone,
        highlight: colorHelper.shade(dashboardColors.blueStone, 15),
        label: 'Vegetables',
        percentage: 27,
        order: 4,
      }, {
        value: 14,
        color: dashboardColors.surfieGreen,
        highlight: colorHelper.shade(dashboardColors.surfieGreen, 15),
        label: 'Beans',
        percentage: 14,
        order: 3,
      }, {
        value: 13,
        color: dashboardColors.silverTree,
        highlight: colorHelper.shade(dashboardColors.silverTree, 15),
        label: 'Dairy',
        percentage: 12,
        order: 2,
      }, {
        value: 10,
        color: dashboardColors.gossip,
        highlight: colorHelper.shade(dashboardColors.gossip, 15),
        label: 'Pasta',
        percentage: 10,
        order: 0,
      },
    ];

    var ctx = document.getElementById('chart-area').getContext('2d');
    window.myDoughnut = new Chart(ctx).Doughnut($scope.doughnutData, {
      segmentShowStroke: false,
      percentageInnerCutout: 64,
      responsive: true
    });
  }
})();