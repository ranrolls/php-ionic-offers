(function () {
  'use strict';

  angular.module('starter.controllers').controller('SignupCtrl',
    function($state, $scope, toastr) {

    var vm = this;
    $scope.showpassword = false;

    //$scope.$watch("showpassword",
    //  function (newValue, oldValue) {
    //    //toastr.info(newValue);
    //  }
    //);
    //
    //$scope.login = function () {
    //  $state.go('tab.settings');
    //
    //  //$scope.modal.remove();
    //
    //};

    $scope.notNow = function () {
      $state.go('tab.list');
      //$scope.modal.remove();
    };
    //toastr.info('sign up');
  });

})();
