(function () {

  'use strict';

  angular.module('starter.controllers').controller('LoginCtrl',
    function ($state, $scope, $http, $rootScope, $timeout, toastr, user, gvar) {

      var vm = this;

      $scope.passType = "password";
      $scope.showpassword = false;
      $scope.shP = false;

      var us = 0;

      user.getSqlLogin().then(function (sl) {
        if (sl == 1) {
          user.setSqlLogin(0).then(function (o) {
            us = 0;
            $state.go('tab.settings');
            if (gvar.development) toastr.error('user logout');
            $scope.modal.remove();
          })
        }
      });

      $scope.ping = function () {
        if (gvar.development) toastr.info('ping');
      };

      $scope.loginUser = function () {

        user.setSqlLogin(1).then(function (r) {

          us = 1;
          //$scope.$apply(function () {
            $scope.us = true;
          //});
          //$scope.us = true;
          $state.go('tab.uac');
          $scope.modal.remove();

        });

      };

      $scope.signUp = function () {
        $state.go('signup');
        $scope.modal.remove();
      };

      $scope.notNow = function () {
        $state.go('tab.list');
        $scope.modal.remove();
      };


      //$ionicPlatform.ready(function() {
      //if($cordovaDevice.getDevice()) {
      //try {
      //  var device = $cordovaDevice.getDevice();
      //  var cordova = $cordovaDevice.getCordova();
      //  var model = $cordovaDevice.getModel();
      //  var platform = $cordovaDevice.getPlatform();
      //  var uuid = $cordovaDevice.getUUID();
      //  var version = $cordovaDevice.getVersion();
      //
      //  toastr.success(device);
      //  toastr.success(cordova);
      //  toastr.success(model);
      //  toastr.success(platform);
      //  toastr.success(uuid);
      //  toastr.success(version);
      //}catch(e) {
      //  //}else{
      //  toastr.error('cordova device not found');
      //  toastr.error(e);
      //  //}
      //}
      //});

    }
  );

})();


//document.addEventListener("deviceready", function(){
//  alert(device.cordova);
//}, false);
