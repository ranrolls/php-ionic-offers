(function () {

  'use strict';

  angular.module('starter')
    .config(function ($stateProvider) {
      $stateProvider
        .state('tab.map', {
          url: '/map',
          views: {
            'tab-list': {
              templateUrl: 'js/modules/map/map2.html',
              controller: 'MapCtrl2 as mc2',
              resolve: {
                ask: ask
              }
            }
          }
        })
      ;
    });

  function ask(cordova) {
    //cordova.beforeListCheck();
    cordova.ask();
  }

})();
