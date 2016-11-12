/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('blurFeedzy', blurFeed);

  /** @ngInject */
  function blurFeed() {
    return {
      restrict: 'E',
      controller: 'BlurFeedCtrlzy',
      templateUrl: 'app/pages/dashboard/blurFeedzy/blurFeedzy.html'
    };
  }
})();