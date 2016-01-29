(function () {

  'use strict';

  angular.module('starter.controllers').controller('MapCtrl2',
    function ($state, $scope, $document, $cordovaGeolocation, toastr, gety, cordova) {

      var vm = this;
      //toastr.info(' in map ctrl ');
      $scope.done = function () {
        gety.updateParam4(0).then(function () {
          $scope.modal.remove();
        });
      };

      vm.data = [];
      vm.resultSet = [];
      vm.msg1 = "";
      vm.msg2 = "";

      var currentPos = [], markers = [], pointerCount = 5, myLatLng, map, directionsService, directionsDisplay;

      var a = ' Mobile device detected. '
        , b = ' No mobile device detected. '
        , c = ' Error while detecting device '
        , d = ' No network available '
        , e = ' Device not found '
        , f = ' Navigator Geolocation thrown error! '
        , g = ' Searching current position of device '
        , h = ' Success finding device position '
        ;
      var operation = false, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0;

      $scope.control = 0;

      // find user current Device Position
      function getCurrentDevicePosition() {
        try {
          var posOptions = {timeout: 10000, enableHighAccuracy: false};
          $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {

              currentPos = position.coords;

              if (position.coords.accuracy > 1) {
                getNearbyStores();
              }
            }, function (error) {
              // error
              vm.msg2 += error.message;
            });
        } catch (e) {
        }
      };

      // get nearby stores location
      function getNearbyStores() {
        vm.msg1 += ' in get nearby stores ';

        map;
        var elevator;
        var myOptions = {
          zoom: 17,
          center: new google.maps.LatLng(28.5165471, 77.2808813),
          mapTypeId: 'terrain'
        };

        map = new google.maps.Map($('#map')[0], myOptions);


        markers = [];

        function mapStart() {
          myLatLng = {lat: 28.5165471, lng: 77.2808813};

          // Create an ElevationService
          elevator = new google.maps.ElevationService();
          $.each(markers, function (key, value) {
            value.setMap(null);
          });
          // getting bounds of current location
          var boundBox = map.getBounds();
          var southWest = boundBox.getSouthWest();
          var northEast = boundBox.getNorthEast();
          var lngSpan = northEast.lng() - southWest.lng();
          var latSpan = northEast.lat() - southWest.lat();
          // adding 20 markers to the map at random locations
          var locations = [];
          for (var j = 0; j < pointerCount; j++) {
            var location = new google.maps.LatLng(
              southWest.lat() + latSpan * Math.random(),
              southWest.lng() + lngSpan * Math.random()
            );
            locations.push(location);
          }

          // Create a LocationElevationRequest object using the array's one value
          var positionalRequest = {
            'locations': locations
          };

          var marker = new google.maps.Marker({
            map: map,
            position: myLatLng,
            title: 'Hello World!',
            icon: 'http://google-maps-icons.googlecode.com/files/sailboat-tourism.png'
          });


          elevator.getElevationForLocations(positionalRequest, function (results, status) {
            if (status === google.maps.ElevationStatus.OK) {
              $.each(results, function (key, value) {
                if (value.elevation < 0) {
                  markers[key] = new google.maps.Marker({
                    position: value.location,
                    map: map,
                    icon: 'http://google-maps-icons.googlecode.com/files/sailboat-tourism.png'
                  });
                }
                else {
                  markers[key] = new google.maps.Marker({
                    position: value.location,
                    map: map,
                    icon: 'http://google-maps-icons.googlecode.com/files/red' + ('0' + key.toString()).slice(-2) + '.png'
                  });
                }

                if (key == pointerCount - 1) {
                  $.each(markers, function (k1, v1) {

                    //google.maps.event.addListener(v1, "click", function (ev) {
                    //  handleNavigation(v1);
                    //});

                    google.maps.event.addListener(markers[k1], "click", function (ev) {
                      handleNavigation(markers[k1]);
                    });

                  });
                }

                //console.log(key);
              });
            }
          });
        };

        google.maps.event.addListener(map, 'idle', mapStart);
      };

      // further handling navigation to these individual stores
      function handleNavigation(destination) {

        console.log(' in handle navigation and incomming object is  ');
        //console.log(destination);
        try {
          //if(!destination.getPosition()) console.log('error finding position');

          var dlt = destination.getPosition().lat();
          var dln = destination.getPosition().lng();

          console.log(' Latitude is = ' + dlt + ' and lng = ' + dln);

          showDirection(myLatLng, {lat: dlt, lng: dln});

          //console.log(destination.location);
        } catch (e) {
          console.log(' position not found ');
        }

      };

      function showDirection(src, dest) {

        if (typeof directionsDisplay == "undefined") {
          directionsDisplay = new google.maps.DirectionsRenderer({
            map: map
          });
        }

        var request = {
          destination: dest,
          origin: src,
          travelMode: google.maps.TravelMode.DRIVING
        };

        if (typeof directionsService == "undefined") {
          directionsService = new google.maps.DirectionsService();
        }

        directionsService.route(request, function (response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            // Display the route on the map.
            directionsDisplay.setDirections(response);
          }
        });

      }

      // distribution of login in algorithmic functions
      function operations() {
        getNearbyStores();
      }

      //operations();

      function init() {

        //$('#map').height("100%");
        //$('#map').height("" + cH + "px");
        //$('#map').css('margin-top', mH);

        gety.setReached(true);

        gety.updateParam4(1).then(function () {

          var dp = cordova.getDPlatform();
          toastr.success(dp);

          if (dp == 'android' || dp == 'Android' || dp == 'ios' || dp == 'Ios') {
            operations();
          } else {
            toastr.error(b);
          }

        });

      }

      init();

    }
  )
  ;

})();
