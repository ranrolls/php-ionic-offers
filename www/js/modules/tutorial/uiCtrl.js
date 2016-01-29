(function () {

  'use strict';

  angular.module('starter.controllers').controller('UiCtrl',

    function ($ionicLoading, $ionicPlatform,
              $cordovaDevice, $cordovaDialogs, $cordovaGeolocation, $cordovaNetwork,
              $state, $scope,
              toastr, cordova, help, gvar, error) {

      var vm = this;
      var appVersion = "0.0.1";

      var operation = function (form) {
        $ionicLoading.show();
        //toastr.success('submitting form');
        if (form.$valid) {
        //if (form) {
          if (typeof device != 'undefined') {
            //toastr.success('got device');
            cordova.setDName(device.name); // device brand name and model name
            cordova.setDCordova(device.cordova); // cordova version
            cordova.setDPlatform(device.platform);
            cordova.setDUuid(device.uuid);
            cordova.setDVersion(appVersion);
            cordova.setDModel(device.model);

            try {
              var posOptions = {timeout: 3000, enableHighAccuracy: false};

              if ($cordovaNetwork.isOffline()) {
                // when offline

                $ionicLoading.hide();
                $cordovaDialogs.alert('Kindly turn on network for your device.', 'ONM', 'Retry Now!')
                  .then(function () {
                    if ($cordovaNetwork.isOnline()) {
                      $timeout(function () {
                        operation(form);
                        //cordova.askLocation();
                      }, gvar.wait5);
                    } else {
                      //cordova.askConnect();
                      $timeout(function () {
                        operation(form);
                        //cordova.askLocation();
                      }, gvar.wait5);
                    }

                  });
              } else {

                navigator.geolocation.getCurrentPosition(function (position) {
                  // success
                  cordova.setDLat(position.coords.latitude); // 28.5165471
                  cordova.setDLong(position.coords.longitude); // 77.2808813
                  cordova.setDAlt(position.coords.altitude); // null

                  //cordova.updateCordova();

                  //toastr.success('lat is ' + position.coords.latitude);

                  var param = {
                    username: vm.form.name,
                    email: vm.form.email,
                    deviceid: cordova.getDUuid(),
                    deviceversion: appVersion,
                    devicemodel: cordova.getDModel(),
                    deviceplatform: cordova.getDPlatform(),
                    latitude: cordova.getDLat(),
                    longitude: cordova.getDLong()
                  }

                  //toastr.info(param);

                  help.fetchPromise('ui', param).then(function (r) {
                    //toastr.success('success ui send');
                    if (r.status == 1) {
                      $state.go('tab.list');
                    } else {
                      $state.go('ui');
                    }
                    $ionicLoading.hide();
                  }, function (e) {

                  });

                }, function () {
                  // error
                  $ionicLoading.hide();
                  toastr.error('location not found');
                  $cordovaDialogs.alert('Kindly turn on location sensor for your device.', 'ONM', 'Retry Now!')
                    .then(function () {

                      if ($cordovaNetwork.isOnline()) {
                        $timeout(function () {
                          operation(form);
                          //cordova.askLocation();
                        }, gvar.wait5);
                      } else {
                        cordova.askConnect();
                      }

                    });
                }, posOptions);
              } // when online

              //  });
            } catch (e) {
              toastr.error('error from cordova geolocation');
              $ionicLoading.hide();
            }
          } else {
            $ionicLoading.hide();
            //alert(device);
            toastr.error('device not found uiCtrl');

            try{
              //toastr.error(device.name);
              //$ionicPlatform.ready(function(){
              //  // will execute when device is ready, or immediately if the device is already ready.
              //  var deviceInformation = ionic.Platform.device();
              //
              //  var isWebView = ionic.Platform.isWebView();
              //  var isIPad = ionic.Platform.isIPad();
              //  var isIOS = ionic.Platform.isIOS();
              //  var isAndroid = ionic.Platform.isAndroid();
              //  var isWindowsPhone = ionic.Platform.isWindowsPhone();
              //
              //  var currentPlatform = ionic.Platform.platform();
              //  var currentPlatformVersion = ionic.Platform.version();
              //
              //  alert(currentPlatform);
              //
              //});

              //toastr.error('simple device-name');
              //alert(device.name);
              //toastr.error('cordovaDevice getModel =');
              //alert($cordovaDevice.getModel());
            }catch(e){
              //toastr.error(e.message);
            }

          }
          //cordova.init().then(function (r) {

          //}, function (e) {
          //  toastr.info('error in cordova init');
          //})
        } else {
          $ionicLoading.hide();
          try {
            navigator.notification.confirm(
              error.globalEmailValidationError, function () {
              }, error.globalErrorHeading, error.globalErrorButtonTitle);
          } catch (e) {
            toastr.error(error.globalEmailValidationError);
          }
        }
      }

      vm.submit = function (form) {
        operation(form);

      }

      vm.ht = parseInt($('#htTargetBox').css('height')) + 5 + 'px';

      //console.log($('#htTargetBox').css('height'));
      //vm.ht = $document.height();

    });

})();
