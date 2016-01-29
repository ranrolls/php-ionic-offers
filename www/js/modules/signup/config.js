(function () {

  'use strict';

  angular.module('starter')
    .config(function ($stateProvider) {

      $stateProvider

        .state('signup', {
          url: "/signup",
          templateUrl: "js/modules/signup/view.html",
          controller: "SignupCtrl"
        });
    });

})();
