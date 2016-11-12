/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('BlurFeedCtrl', BlurFeedCtrl);

  /** @ngInject */
  function BlurFeedCtrl($scope) {
    $scope.feed = [
      {
        type: 'text-message',
        author: 'Pizza',
        header: 'Posted new message',
        text: 'Kebab pizza',
        time: '12:20 pm',
        ago: 'Yesterday',
        expanded: false,
      }, {
        type: 'text-message',
        author: 'Tarragon chicken',
        header: 'Added new video',
        text: 'Chicken with tarragon souce',
        time: '11:35 am',
        ago: '10 Nov',
        expanded: false,
      },
    ];

    $scope.expandMessage = function(message){
      message.expanded = !message.expanded;
    }
  }
})();