/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('blurFeedTwo', blurFeed);

  /** @ngInject */
  function blurFeed() {
    return {
      restrict: 'E',
      controller: 'BlurFeedCtrl2',
      templateUrl: 'app/pages/dashboard/blurFeed.1/blurFeed.html'
    };
  }
})();