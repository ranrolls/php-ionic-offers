(function () {

  'use strict';

  angular.module('service')

    .factory('pushP', function ($q, $cordovaDevice, toastr, gvar, help) {

      var rnd;

      function registerNewDevice(par) {

        //toastr.info('incomming to register new device');
        //toastr.success(par);

        help.fetchPromise('push-step-one', par).success(function (data, status, headers, config) {
          //console.log(JSON.stringify(config.params));
          //console.log(JSON.stringify(data));
          // toastr.success('value send to serve');
        }).error(function (data, status, headers, config) {
          //$state.go('home.root');
          // toastr.error('unable to send values');
        });

      }

      function checkPush() {

        var platform = $cordovaDevice.getPlatform();
        var uuid = $cordovaDevice.getUUID();

        var def21 = $q.defer();
        rnd = new Date().getTime();

        var par = {
          deviceid: uuid,
          devicetoken: 126,
          deviceplatform: platform,
          rnd: rnd
        };

        //toastr.info('par for push-step-one registration');
        //toastr.success(par);

        help.fetchPromise('push-step-one', par).success(
          function (data, status, headers, config) {
          def21.resolve(data);
        }).error(function (data, status, headers, config) {
            toastr.error('failed check push in pushP')
          def21.reject("Failed to get data");
          //$state.go('home.root');
        });

        return def21.promise;
      }

      function sendAppVersion(v,uid){
        var par = {
          version : v,
          deviceid : uid
        }

        //toastr.info('incomming to send app version');
        //toastr.info(par);
        //status"0"
        //message"Updated Version Available"
        //result"www.google.com"
        return help.fetchPromise('vu',par);
      }

      return {
        checkPush: checkPush,
        registerNewDevice: registerNewDevice,
        sendAppVersion : sendAppVersion
      };
    });


})();
