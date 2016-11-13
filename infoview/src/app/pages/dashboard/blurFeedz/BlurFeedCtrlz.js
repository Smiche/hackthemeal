/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('BlurFeedCtrlz', BlurFeedCtrlz);

  /** @ngInject */
  function BlurFeedCtrlz($scope, dataService) {
    dataService.getMostPop().then(function(res){
      $scope.feed = res;
      /* $scope.feed = [
      {
        type: 'text-message',
        author: 'Mashed potato',
        header: 'Posted new message',
        text: '',
        time: 'Last served',
        ago: 'Yesterday',
        expanded: false,
      }, {
        type: 'text-message',
        author: 'Cheese sausage',
        header: 'Added new video',
        text: 'Sausage backed with cheese',
        time: 'Last served:',
        ago: '13 Oct',
        expanded: false,
      }, {
        type: 'text-message',
        author: 'Carbonara',
        header: 'Added new video',
        text: 'Pasta Carbonara',
        time: 'Last served:',
        ago: '14 April',
        expanded: false,
      }, {
        type: 'text-message',
        author: 'Pizza',
        header: 'Added new video',
        text: 'Kebab pizza',
        time: 'Last served:',
        ago: '26 September',
        expanded: false,
      },
    ];
    */
    $scope.expandMessage = function(message){
      message.expanded = !message.expanded;
    }
    }).catch(function(err){
      console.log(err);
    });
  }
})();