(function () {

  'use strict';

  angular.module('starter')
    .config(function ($stateProvider) {

      $stateProvider

        .state('tab.uac', {
          url: '/uac',
          views: {
            'tab-uac': {
              templateUrl: 'js/modules/uac/view.html',
              controller: 'UacCtrl as uc',
              resolve: {
                ask: ask,
                setState: setState
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
