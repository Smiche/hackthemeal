/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
    .controller('BlurFeedCtrl2', BlurFeedCtrl);

  /** @ngInject */
  function BlurFeedCtrl($scope, dataService) {
    dataService.getPredictions().then(function (res) {
      var all = res;
      var vegArr = [];
      var meatArr = [];

      for(var i = 0;i<all.length;i++){
          var cur = all[i];
          if(cur.dish.status == "vegetarian" && vegArr.length < 5){
            cur.score.toFixed(2);
            vegArr.push(cur);
          } 

          if(cur.dish.status == "meat" && meatArr.length < 5){
            cur.score.toFixed(2);
            meatArr.push(cur);
          }
      }

      $scope.pairs = [vegArr[0],vegArr[1],meatArr[0],meatArr[1]];

      //$scope.feed = res;
     /* $scope.feed = [
        {
          type: 'text-message',
          author: 'Pizza',
          header: 'Posted new message',
          text: 'Kebab pizza',
          time: '',
          ago: 'Yesterday',
          expanded: false,
        }, {
          type: 'text-message',
          author: 'Tarragon chicken',
          header: 'Added new video',
          text: 'Chicken with tarragon sauce',
          time: '',
          ago: 'Yesterday',
          expanded: false,
        }, {
          type: 'text-message',
          author: 'Sauce sausages',
          header: 'Added new video',
          text: 'Small slices of sausages in sauce',
          time: '',
          ago: '10 Nov',
          expanded: false,
        }, {
          type: 'text-message',
          author: 'Grilled beef',
          header: 'Added new video',
          text: 'Grilled beef with baked cheese',
          time: '',
          ago: '10 Nov',
          expanded: false,
        },
      ]; */

      $scope.expandMessage = function (message) {
        message.expanded = !message.expanded;
      }

    }).catch(function (err) {
      console.log(err);
    });
  }
})();