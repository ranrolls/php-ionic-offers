(function () {

  'use strict';

  angular.module('service')

    .factory('help', function ($http, $q, $ionicLoading, $state, $cordovaNetwork,
                               url, gvar, toastr) {

      function pingMail(parameters) {

        if ($cordovaNetwork.isOffline()) {
          try {
            navigator.notification.confirm(
              gvar.globalNetworkContentMessage, //  message
              function(buttonIndex) {
                $state.go('home.root');
              }, //  callback to invoke
              gvar.globalErrorHeading, //  title
              gvar.globalErrorButtonTitle //  button Name
            );
          } catch (e) {
            toastr.info(gvar.globalNetworkContentMessage);
            $state.go('home.root');
          }
        }

        var def = $q.defer();
        $http.get(url.getUrl('contact-us'), {
          params: parameters
        }).success(function(data, status, headers, config) {
          def.resolve(data);
        }).error(function(data, status, headers, config) {
          def.reject("Failed to get data");
          try {
            navigator.notification.confirm(
              gvar.globalNetworkContentMessage, //  message
              function(buttonIndex) {
                //            alert('You selected button ' + buttonIndex);
              }, //  callback to invoke
              gvar.globalErrorHeading, //  title
              gvar.globalErrorButtonTitle //  button Name
            );
          } catch (e) {
            toastr.info(gvar.globalNetworkContentMessage);
          }
        });
        return def.promise;

      };

      function fetchPromise(ur, parameters) {

        if (typeof parameters === "undefined") {
          parameters = {};
        }
        if (ur.length > 1) {
          //                console.log(url.getUrl(url));
          //                console.log(parameters);
          var help1 = $q.defer();
          $http.get(url.getUrl(ur), {
            params: parameters
          }).success(function(data, status, headers, config) {

            //console.log(JSON.stringify(config.params));
            //console.log(JSON.stringify(data));

            // console.log(config);
            help1.resolve(data);
          }).error(function(data, status, headers, config) {
            help1.reject("Failed to get data");
            try {
              navigator.notification.confirm(
                gvar.globalNetworkContentMessage, //  message
                function(buttonIndex) {
                  //            alert('You selected button ' + buttonIndex);
                }, //  callback to invoke
                gvar.globalErrorHeading, //  title
                gvar.globalErrorButtonTitle //  button Name
              );
            } catch (e) {
              toastr.error(gvar.globalNetworkContentMessage);
            }
          });
          return help1.promise;

        } else {
          return false;
        }
      };

      return {
        pingMail: pingMail,
        fetchPromise: fetchPromise
      };

    });


})();
