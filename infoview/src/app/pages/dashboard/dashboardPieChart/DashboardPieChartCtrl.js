/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
    .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

  /** @ngInject */
  function DashboardPieChartCtrl($scope, $timeout, baConfig, baUtil, ReportTemplateService, $interval, $rootScope) {

    var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
    $scope.charts = [{
      color: pieColor,
      description: "You've eaten: ",
      stats: '% of your goal',
      icon: 'person',
    }, {
        color: pieColor,
        description: 'Last update',
        stats: getTimeString(new Date),
        icon: 'refresh',
      }
    ];

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function loadPieCharts() {
      $('.chart').each(function () {
        var chart = $(this);
        chart.easyPieChart({
          easing: 'easeOutBounce',
          onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
          },
          barColor: chart.attr('rel'),
          trackColor: 'rgba(0,0,0,0)',
          size: 84,
          scaleLength: 0,
          animation: 2000,
          lineWidth: 9,
          lineCap: 'round',
        });
      });
      /*
      $('.refresh-data').on('click', function () {
        updatePieCharts();
      });*/
    }

    function updatePieCharts() {
      $('.pie-charts .chart').each(function (index, chart) {
        $(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
      });
    }

    var counter = 0;
    function getTimeString(date) {
      function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }


      var seconds = addZero(date.getSeconds());
      var minutes = addZero(date.getMinutes());
      var hour = addZero(date.getHours());
      return hour + ":" + minutes + ":" + seconds;
    }

    function updateDashboard() {
      $rootScope.$emit('update');
    }

    $rootScope.$on('update-ui', function () {

      var data = ReportTemplateService.GetPieData();
      var chart0 = $('.pie-charts .chart').get(0);
      $(chart0).data('easyPieChart').update(100 * (data.reportsToday / data.reportsThisMonth));
      $scope.charts[0].description = "Reports today: "+data.reportsToday;

      var chart1 = $('.pie-charts .chart').get(1);
      $(chart1).data('easyPieChart').update(100 * (data.doneToday / data.doneThisMonth));
      $scope.charts[1].description = "Completed from today: "+data.doneToday;

      var chart2 = $('.pie-charts .chart').get(2);
      $(chart2).data('easyPieChart').update(100);
      $scope.charts[2].description = "Users count: "+data.users;

    });

    $interval(function () {
      var chart = $('.pie-charts .chart').get(3);
      counter++;
      var updateValue = counter * 2;
      if (counter >= 50) {
        counter = 0;
        updateValue = 0;
        $scope.charts[3].stats = getTimeString(new Date);
        updateDashboard();
      }
      $(chart).data('easyPieChart').update(updateValue);
    }, 1200);

    $timeout(function () {
      loadPieCharts();
      updatePieCharts();
      $rootScope.$emit('update');
    }, 1000);
  }
})();