(function () {

  'use strict';

  angular.module('starter')
    .config(function ($stateProvider) {

      $stateProvider

        .state('test', {
          url: "/test",
          templateUrl: "js/modules/test/view.html",
          controller: "TestCtrl"
        });
    });

})();
