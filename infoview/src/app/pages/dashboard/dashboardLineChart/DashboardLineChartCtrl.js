/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
    .controller('DashboardLineChartCtrl', DashboardLineChartCtrl);

  /** @ngInject */
  function DashboardLineChartCtrl(baConfig, layoutPaths, baUtil, dataService, $timeout) {

 dataService.getMonth().then(function (res) {
    $timeout(function () {
      angular.element(document).ready(function () {
        var layoutColors = baConfig.colors;
        var graphColor = baConfig.theme.blur ? '#000000' : layoutColors.primary;

        var res = { "2016-11-30T22:00:00.000Z": 8, "2016-11-14T22:00:00.000Z": 30, "2016-11-13T22:00:00.000Z": 2, "2016-11-21T22:00:00.000Z": 2, "2016-11-29T22:00:00.000Z": 33, "2016-11-28T22:00:00.000Z": 1, "2016-11-20T22:00:00.000Z": 30, "2016-12-06T22:00:00.000Z": 21, "2016-12-08T22:00:00.000Z": 79, "2016-11-24T22:00:00.000Z": 75, "2016-12-04T22:00:00.000Z": 34, "2016-12-01T22:00:00.000Z": 65, "2016-12-07T22:00:00.000Z": 30, "2016-11-27T22:00:00.000Z": 52, "2016-11-15T22:00:00.000Z": 37, "2016-11-17T22:00:00.000Z": 24, "2016-11-16T22:00:00.000Z": 42, "2016-11-23T22:00:00.000Z": 28, "2016-11-22T22:00:00.000Z": 25, "2016-12-05T22:00:00.000Z": 43 };

        var chartData = [];
        for (var key in res) {
          chartData.push({
            date: new Date(key),
            value: res[key]
          });
        }

        chartData = chartData.sort(function (a, b) {
          a = a.date;
          b = b.date;
          return a < b ? -1 : a > b ? 1 : 0;
        });

        /*
        var chartData = [
          { date: new Date(2012, 11), value: 0, value0: 0 },
          { date: new Date(2013, 0), value: 15000, value0: 19000 },
          { date: new Date(2013, 1), value: 30000, value0: 20000 },
  
          { date: new Date(2013, 2), value: 25000, value0: 22000 },
          { date: new Date(2013, 3), value: 21000, value0: 25000 },
          { date: new Date(2013, 4), value: 24000, value0: 29000 },
          { date: new Date(2013, 5), value: 31000, value0: 26000 },
          { date: new Date(2013, 6), value: 40000, value0: 25000 },
          { date: new Date(2013, 7), value: 37000, value0: 20000 },
          { date: new Date(2013, 8), value: 18000, value0: 22000 },
          { date: new Date(2013, 9), value: 5000, value0: 26000 },
          { date: new Date(2013, 10), value: 40000, value0: 30000 },
          { date: new Date(2013, 11), value: 20000, value0: 25000 },
          { date: new Date(2014, 0), value: 5000, value0: 13000 },
  
          { date: new Date(2014, 1), value: 3000, value0: 13000 },
          { date: new Date(2014, 2), value: 1800, value0: 13000 },
          { date: new Date(2014, 3), value: 10400, value0: 13000 },
          { date: new Date(2014, 4), value: 25500, value0: 13000 },
          { date: new Date(2014, 5), value: 2100, value0: 13000 },
          { date: new Date(2014, 6), value: 6500, value0: 13000 },
          { date: new Date(2014, 7), value: 1100, value0: 13000 },
          { date: new Date(2014, 8), value: 17200, value0: 13000 },
          { date: new Date(2014, 9), value: 26900, value0: 13000 },
          { date: new Date(2014, 10), value: 14100, value0: 13000 },
          { date: new Date(2014, 11), value: 35300, value0: 13000 },
          { date: new Date(2015, 0), value: 54800, value0: 13000 },
          { date: new Date(2015, 1), value: 49800, value0: 13000 }
        ];
        */
        var chart = AmCharts.makeChart('amchart', {
          type: 'serial',
          theme: 'blur',
          marginTop: 15,
          marginRight: 15,
          dataProvider: chartData,
          categoryField: 'date',
          categoryAxis: {
            parseDates: true,
            gridAlpha: 0,
            color: layoutColors.defaultText,
            axisColor: layoutColors.defaultText
          },
          valueAxes: [
            {
              minVerticalGap: 50,
              gridAlpha: 0,
              color: layoutColors.defaultText,
              axisColor: layoutColors.defaultText
            }
          ],
          graphs: [
            {
              id: 'g0',
              bullet: 'none',
              useLineColorForBulletBorder: true,
              lineColor: baUtil.hexToRGB(graphColor, 0.3),
              lineThickness: 1,
              negativeLineColor: layoutColors.danger,
              type: 'smoothedLine',
              valueField: 'value',
              fillAlphas: 1,
              fillColorsField: 'lineColor'
            },
            /*{
              id: 'g1',
              bullet: 'none',
              useLineColorForBulletBorder: true,
              lineColor: baUtil.hexToRGB(graphColor, 0.5),
              lineThickness: 1,
              negativeLineColor: layoutColors.danger,
              type: 'smoothedLine',
              valueField: 'value',
              fillAlphas: 1,
              fillColorsField: 'lineColor'
            }*/
          ],
          chartCursor: {
            categoryBalloonDateFormat: 'MM YYYY',
            categoryBalloonColor: '#4285F4',
            categoryBalloonAlpha: 0.7,
            cursorAlpha: 0,
            valueLineEnabled: true,
            valueLineBalloonEnabled: true,
            valueLineAlpha: 0.5
          },
          dataDateFormat: 'MM YYYY',
          export: {
            enabled: true
          },
          creditsPosition: 'bottom-right',
          zoomOutButton: {
            backgroundColor: '#fff',
            backgroundAlpha: 0
          },
          zoomOutText: '',
          pathToImages: layoutPaths.images.amChart
        });
        /*
        function zoomChart() {
          chart.zoomToDates(chartData[0].date, chartData[chartData.length - 1].date);
        }

        chart.addListener('rendered', zoomChart);
        zoomChart();
        if (chart.zoomChart) {
          chart.zoomChart();
        }
        */
      });
    }, 1);
    }).catch(function (err) {
       console.log(err);
      });


  }
})();