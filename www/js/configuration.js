(function () {

    'use strict';

    angular.module('starter')
//        .config(function ($httpProvider) {
//            $httpProvider.interceptors.push(function ($rootScope) {
//                return {
//                    request: function (config) {
//                        $rootScope.$broadcast('loading:show')
//                        return config
//                    },
//                    response: function (response) {
//                        $rootScope.$broadcast('loading:hide')
//                        return response
//                    }
//                }
//            })
//        })

    .config(function(toastrConfig) {
      angular.extend(toastrConfig, {
        allowHtml: false,
        closeButton: true,
        closeHtml: '<button>&times;</button>',
        extendedTimeOut: 3000,
        iconClasses: {
          error: 'toast-error',
          info: 'toast-info',
          success: 'toast-success',
          warning: 'toast-warning'
        },
        messageClass: 'toast-message',
        onHidden: null,
        onShown: null,
        onTap: null,
        progressBar: false,
        tapToDismiss: true,
        timeOut: 5000,
        titleClass: 'toast-title',
        toastClass: 'toast'
      });
    })

      .config(function($ionicConfigProvider){
        $ionicConfigProvider.tabs.position('bottom'); // other values: top
      })

    .factory('$exceptionHandler', function () {
        return function errorCatcherHandler(exception, cause) {
//            console.log(exception.substr(0,25));
//            console.log(typeof exception);
//            console.log(exception.TypeError);

            if(exception.name == "TypeError" && exception.message == "i is undefined"){
//                console.log(exception.name);
//                console.error(exception.message);
            }else if(exception.message == "The connection to ws://192.168.0.96:35729/livereload was interrupted while the page was loading." || exception.message == "Using //@ to indicate sourceMappingURL pragmas is deprecated. Use //# instead" || exception.message == "WebSocket connection to 'ws://192.168.0.96:35729/livereload' failed: Error in connection establishment: net::ERR_CONNECTION_REFUSED")
            {

            }
            else{
                console.error(exception);
            }
//            console.error(exception);
//            console.log(exception);
//            console.error(exception.stack);   .constructor,

//            Vendor-specific Extensions
//
//Microsoft:
//
//description: Error description. Similar to message.
//
//number: Error number.
//
//Mozilla:
//
//fileName: Path to file that raised this error.
//
//lineNumber: Line number in file that raised this error.
//
//stack: Stack trace.
//            Raven.captureException(exception);
        };
    });

//    .config(function($provide) {
//        $provide.decorator('$exceptionHandler', ['$log', '$delegate',
//          function($log, $delegate) {
//            return function(exception, cause) {
//              $log.debug('Default exception handler.');
//              $delegate(exception, cause);
//            };
//          }
//        ]);
//      });


  $(window).bind("orientationchange", function () {
    var orientation = window.orientation;
    var new_orientation = (orientation) ? 0 : 180 + orientation;
    $('body').css({
      "-webkit-transform": "rotate(" + new_orientation + "deg)"
    });
  });

  document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady() {

    //try {
    //  navigator.splashscreen.show();
    //}catch(e){}

    document.addEventListener("backbutton", function (e) {
      e.preventDefault();
    }, false);

  };

//   function detectOrientation(){
//       if(typeof window.onorientationchange != 'undefined'){
//           if ( orientation == 0 ) {
//               //Do Something In Portrait Mode
////                alert('orientation value is = ' + orientation);
//           }
//           else if ( orientation == 90 ) {
//               //Do Something In Landscape Mode
////                alert('orientation value is = ' + orientation);
//           }
//           else if ( orientation == -90 ) {
//               //Do Something In Landscape Mode
////                alert('orientation value is = ' + orientation);
//           }
//           else if ( orientation == 180 ) {
//               //Do Something In Landscape Mode
////                alert('orientation value is = ' + orientation);
//           }
//       }
//   }
//
//   detectOrientation();
//   window.onorientationchange = detectOrientation;

})();
