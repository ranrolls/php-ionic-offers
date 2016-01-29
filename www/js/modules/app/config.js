(function () {

  'use strict';

  angular.module('starter')
    .config(function ($stateProvider) {

      $stateProvider

        // setup an abstract state for the tabs directive
        .state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: 'js/modules/template/tabs.html',
          controller: "AppCtrl",
          controllerAs: "ac"
        })
        .state('start', {
          url: '/start',
          templateUrl: 'js/modules/app/start.html',
          controller: "StartCtrl",
          resolve: {
            pass: pass
          }
        })
        .state('dbInit', {
          url: '/dbInit',
          templateUrl: 'js/modules/app/dbInit.html',
          controller: "DbInitCtrl"
        })
      ;
    });

  function pass($rootScope, $state, gety) {

    $rootScope.db = openDatabase('onm2016', '1.0', 'description', 1 * 1024 * 1024);
    //gety.isFirstStart().then(function (f) {
    //  //console.log(f);
    //  if (!f) {
    //    $state.go('tab.list');
    //  }
    //})
    return null;

  }

})();
