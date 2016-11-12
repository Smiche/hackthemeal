/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
    .controller('BlurFeedCtrl', BlurFeedCtrl);

  /** @ngInject */
  function BlurFeedCtrl($scope, dataService) {
    dataService.getYesterday().then(function (res) {
      $scope.feed = res;
      $scope.feed = [
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
      ];

      $scope.expandMessage = function (message) {
        message.expanded = !message.expanded;
      }

    }).catch(function (err) {
      console.log(err);
    });
  }
})();