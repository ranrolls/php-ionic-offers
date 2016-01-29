(function () {

    'use strict';

    angular.module('starter.controllers')
        .config(function ($stateProvider) {
            $stateProvider
              .state('tut', {
                url: '/tut',
                templateUrl: 'js/modules/tutorial/view.html',
                controller: "TutCtrl as tut"
              })
              .state('ui', {
                url: '/ui',
                templateUrl: 'js/modules/tutorial/ui.html',
                controller: "UiCtrl as ui",
                resolve : {
                  ask : ask
                }
              });
        });

  function ask(cordova){
    cordova.ask();
  }

})();
