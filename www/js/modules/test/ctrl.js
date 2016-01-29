(function () {

  'use strict';

  angular.module('starter.controllers').controller('TestCtrl', function ($state, $scope, $ionicPlatform, $cordovaGeolocation, toastr) {

    var vm = this;

    toastr.info('test ctrl');


    $scope.click5 = function () {

      toastr.info('clicked 5');

      var options = { timeout: 31000, enableHighAccuracy: true, maximumAge: 90000 };

      options = {maximumAge: 0, timeout: 30000, enableHighAccuracy: false};

      $ionicPlatform.ready(function () {

        navigator.geolocation.getCurrentPosition(function (position) {
            //success
            //alert('Latitude: ' + position.coords.latitude + '\n' +
            //  'Longitude: ' + position.coords.longitude + '\n' +
            //  'Altitude: ' + position.coords.altitude + '\n' +
            //  'Accuracy: ' + position.coords.accuracy + '\n' +
            //  'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
            //  'Heading: ' + position.coords.heading + '\n' +
            //  'Speed: ' + position.coords.speed + '\n' +
            //  'Timestamp: ' + position.timestamp + '\n');
            toastr.success(position.coords.latitude);
          },
          function (error) {
            toastr.error('message: ' + error.message + '\n');
          }, options);

      });
    }

    $scope.click4 = function () {

      var currentPos = [], markers = [], pointerCount = 5, myLatLng, map, directionsService, directionsDisplay;

      toastr.info('clicked 4');
      toastr.info('in navigator geolocation');

      try {

        var posOptions = {timeout: 30000, enableHighAccuracy: false};
        //posOptions = { enableHighAccuracy: true, maximumAge : 30000, timeout : 27000 };

        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            var lat = position.coords.latitude
            var long = position.coords.longitude
            toastr.success(position);
          }, function (err) {
            // error
            toastr.error('error form cordova geolocation');
            toastr.error(err.message);
          });


        //var posOptions = {timeout: 10000, enableHighAccuracy: false};
        //
        //$cordovaGeolocation
        //  .getCurrentPosition(posOptions)
        //  .then(function (position) {
        //
        //    currentPos = position.coords;
        //
        //    vm.msg1 += ' Latitude: ';
        //    vm.msg1 += position.coords.latitude; // 28.5165471
        //    vm.msg1 += ' Longitude: ';
        //    vm.msg1 += position.coords.longitude; // 77.2808813
        //    vm.msg1 += ' Altitude: ';
        //    vm.msg1 += position.coords.altitude; // null
        //    vm.msg1 += ' Accuracy: ';
        //    vm.msg1 += position.coords.accuracy; // 30
        //
        //    toastr.success(vm.msg1);
        //
        //    if (position.coords.accuracy > 1) {
        //      toastr.info('position coords accuracy is more than 1');
        //      //getNearbyStores();
        //    }
        //
        //  }, function (error) {
        //    // error
        //    toastr.error('error form cordova geolocation');
        //    toastr.error(error.message);
        //  });

        //  ' Latitude: ' + position.coords.latitude + ' \n ' +
        //  ' Longitude: ' + position.coords.longitude + ' \n ' +
        //  ' Altitude: ' + position.coords.altitude + ' \n ' +
        //  ' Accuracy: ' + position.coords.accuracy + ' \n ' +
        //  ' Altitude Accuracy: ' + position.coords.altitudeAccuracy + ' \n ' +
        //  ' Heading: ' + position.coords.heading + ' \n ' +
        //  ' Speed: ' + position.coords.speed + ' \n ' +
        //  ' Timestamp: ' + position.timestamp + ' \n ';

      } catch (e) {
        toastr.error('error catch from cordova geolocation');
        toastr.error(e.message);
      }
    }


    $scope.click1 = function () {
      toastr.info('clicked 1');

      if (typeof device == "undefined") {
        toastr.error('device == undefined');
      }
      ;
      //toastr.info(device);
    }


    $scope.click2 = function () {
      toastr.info('clicked 2');
      toastr.info('device.platform');
      toastr.info(device.platform);
    }


    $scope.click3 = function () {
      toastr.info('clicked 3');

      var networkState = navigator.connection.type;
      var states = {};
      states[Connection.UNKNOWN] = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI] = 'WiFi connection';
      states[Connection.CELL_2G] = 'Cell 2G connection';
      states[Connection.CELL_3G] = 'Cell 3G connection';
      states[Connection.CELL_4G] = 'Cell 4G connection';
      states[Connection.CELL] = 'Cell generic connection';
      states[Connection.NONE] = 'No network connection';

      toastr.info('Connection type: ' + states[networkState]);
      if (states[networkState] == 'No network connection' || states[networkState] == 'Unknown connection') {
        toastr.error('network not found');
        //return false;
      } else {
        toastr.success('network found');
        //return true;
      }
    }


  });

})();
