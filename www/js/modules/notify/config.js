(function () {

  'use strict';

  angular.module('starter')
    .config(function ($stateProvider) {

      $stateProvider

        .state('tab.notify', {
          url: '/notify',
          views: {
            'tab-notify': {
              templateUrl: 'js/modules/notify/view.html',
              controller: 'NotifyCtrl as nc',
              resolve: {
                setState: setState,
                ask: ask
              }
            }
          }
        });
    });

  function ask(cordova) {
    //cordova.beforeListCheck();
    cordova.ask();
  }

  function setState(toastr, gvar, gety) {
    //function setState(gety) {
    //  if (gvar.development) toastr.success('updated sql current state');
    //gety.updateCurrentState('tab.list').then(function (cs) {
    //  gety.pushHibernate().then(function (h) {
    //
    //  })
    //});
    return null;
  }
})();
