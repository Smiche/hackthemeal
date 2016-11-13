/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
    .controller('BlurFeedCtrlzy', BlurFeedCtrlzy);

  /** @ngInject */
  function BlurFeedCtrlzy($scope, dataService) {
    dataService.getWeekPop().then(function (res) {
      var weekDays = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      for (var key in res) {
        res[key].weekday = weekDays[res[key].day];
      }

      $scope.feed = res;
      /*
       $scope.feed = [
         {
           type: 'text-message',
           author: 'Monday',
           header: 'Posted new message',
           text: 'Carrot balls',
           time: 'Total times taken:',
           ago: '584 times',
           expanded: false,
         }, {
           type: 'text-message',
           author: 'Tuesday',
           header: 'Added new video',
           text: 'Sausage backed with cheese',
           time: 'Total times taken:',
           ago: '1364 times',
           expanded: false,
         }, {
           type: 'text-message',
           author: 'Wednesday',
           header: 'Added new video',
           text: 'Grilled roast beef',
           time: 'Total times taken:',
           ago: '1427 times',
           expanded: false,
         }, {
           type: 'text-message',
           author: 'Thursday',
           header: 'Added new video',
           text: 'Carbonara',
           time: 'Total times taken:',
           ago: '1273 times',
           expanded: false,
         }, {
           type: 'text-message',
           author: 'Friday',
           header: 'Added new video',
           text: 'Stroganoff',
           time: 'Total times taken:',
           ago: '625 times',
           expanded: false,
         }
       ];
 
       $scope.expandMessage = function (message) {
         message.expanded = !message.expanded;
       } */
    }).catch(function (err) {
      console.log(err);
    });
  }
})();