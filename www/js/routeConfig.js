/**
 * Created by Admin on 07/12/15.
 */


(function () {

  'use strict';

  angular.module('starter')


  .config(function ($urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
      // Each tab has its own nav history stack:
    // if none of the above states are matched, use this as the fallback

    $urlRouterProvider.otherwise('/start');
    //$urlRouterProvider.otherwise('/test');

  });

})();
