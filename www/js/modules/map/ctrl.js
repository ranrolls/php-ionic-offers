(function () {

  'use strict';

  angular.module('starter.controllers').controller('MapCtrl',
    function ($state, $scope, $timeout, $document, $ionicLoading, $cordovaGeolocation, toastr, gvar, gety, cordova) {

      var vm = this;

      //$scope.lt = parseFloat($scope.lt);
      //toastr.info($scope.lt);
      //$scope.lng = parseFloat($scope.lng);
      //toastr.info($scope.lng);

      //toastr.info(' in map ctrl ');
      $scope.done = function () {
        //gety.updateParam4(0).then(function () {
        $scope.modal.remove();
        //});
      };

      vm.data = [];
      vm.resultSet = [];
      vm.msg1 = "";
      vm.msg2 = "";

      //var currentPos = [], markers = [], pointerCount = 5, myLatLng, map, directionsService, directionsDisplay;
      var currentPos = [], markers = [], pointerCount = 2, myLatLng, map, directionsService, directionsDisplay;

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
        //toastr.info('get current device position');
        try {

          var posOptions = {timeout: 10000, enableHighAccuracy: false};
          $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {

              currentPos = position.coords;

              //toastr.success(position.coords.latitude);

              if (position.coords.accuracy > 1) {
                getNearbyStores();
              }
            }, function (error) {
              // error
              vm.msg2 += error.message;
            });

        } catch (e) {
          toastr.error('get current device position throughs error in mapCtrl.js');
        }

      };

      // get nearby stores location
      function getNearbyStores() {

        //toastr.info('get nearby stores');

        map;
        var elevator;
        var myOptions = {
          zoom: 17,
          center: new google.maps.LatLng($scope.lt, $scope.lng),
          mapTypeId: 'terrain'
        };

        map = new google.maps.Map($('#map')[0], myOptions);


        markers = [];

        function mapStart() {

          //toastr.info('in map ctrl -> getNearbystores -> map Start func');

          if (operation) return false;
          operation = true;
          //myLatLng = {lat: $scope.lt, lng: $scope.lng};

          //toastr.info(currentPos.latitude);
          //toastr.info(currentPos.longitude); // success

          myLatLng = {lat: currentPos.latitude, lng: currentPos.longitude};

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

          //toastr.info(myLatLng);

          var marker = new google.maps.Marker({
            map: map,
            position: myLatLng,
            title: 'Hello World!'
          });

          //toastr.info(JSON.stringify(marker));

          elevator.getElevationForLocations(positionalRequest, function (results, status) {
            if (status === google.maps.ElevationStatus.OK) {
              $.each(results, function (key, value) {

                if (value.elevation < 0) {
                  markers[key] = new google.maps.Marker({
                    position: value.location,
                    map: map
                  });
                }
                else {
                  markers[key] = new google.maps.Marker({
                    position: value.location,
                    map: map
                  });
                }

                if (key == pointerCount - 1) {
                  //var cti = 0;

                  //$ionicLoading.hide();

                  //toastr.info(markers);

                  $.each(markers, function (k1, v1) {

                    //google.maps.event.addListener(v1, "click", function (ev) {
                    //  handleNavigation(v1);
                    //});

                    //google.maps.event.addListener(markers[k1], "click", function (ev) {
                    //  handleNavigation(markers[k1]);
                    //});

                    //$(markers[k1]).on('click',function(){
                    handleNavigation(markers[k1]);
                    //});

                    //if(cti == pointerCount - 1) {
                    //  handleNavigation(markers[k1]);
                    //}
                    //cti++;
                  });
                }
                //console.log(key);
              });
            }
          });
        };

        //try {
        //  $timeout(function () {
        //    handleNavigation(parot);
        //  }, gvar.wait3);
        //}catch(e){
        //  toastr.error(e.message);
        //}

        //mapStart();

        google.maps.event.addListener(map, 'idle', mapStart);

        //$timeout(function () {
        //  $.each(markers, function (k1, v1) {
        //    google.maps.event.addListener(markers[k1], "click", function (ev) {
        //      handleNavigation(markers[k1]);
        //    });
        //  });
        //}, gvar.wait5);
      };

      // further handling navigation to these individual stores
      function handleNavigation(destination) {

        //toastr.info(' in handle navigation and incomming object is  ');
        //toastr.info(destination);
        //console.log(destination);
        try {
          //if(!destination.getPosition()) console.log('error finding position');

          var dlt = destination.getPosition().lat();
          var dln = destination.getPosition().lng();

          //toastr.info(' Latitude is = ' + dlt + ' and lng = ' + dln);

          showDirection(myLatLng, {lat: dlt, lng: dln});

          //console.log(destination.location);
        } catch (e) {
          toastr.error(' position not found ');
        }

      };

      function showDirection(src, dest) {

        //toastr.info('show direction');

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
        //$ionicLoading.hide();
      }

      // distribution of login in algorithmic functions
      function operations() {
        getCurrentDevicePosition();
        //getNearbyStores();
      }

      //operations();

      function init() {

        //$('#map').height("100%");
        //$('#map').height("" + cH + "px");
        //$('#map').css('margin-top', mH);

        //gety.setReached(true);

        //gety.updateParam4(1).then(function () {

        var dp = cordova.getDPlatform();
        //toastr.success(dp);

        if (dp == 'android' || dp == 'Android' || dp == 'ios' || dp == 'Ios') {
          operations();
        } else {
          toastr.error(b);
        }

        //});

      }

      //$('#map').on('click',function(e){
      //  toastr.info(JSON.stringify(e));
      //});

      init();

      //$ionicLoading.show();

    }
  )
  ;

})();
