(function () {

  'use strict';

  angular.module('service')

    .factory('cordova',
    function ($q, $cordovaDialogs, toastr, gvar, $timeout, $rootScope, $ionicLoading,
              $cordovaDevice, $cordovaNetwork, $cordovaGeolocation) {

      var clf = false; // current location found

      self.start = 0;

      self.dName = 'Motorola'; // device brand name and model name
      self.dCordova = '5.4.0'; // cordova version
      self.dPlatform = 'Android';
      self.dUuid = '789456123456789';
      self.dVersion = '5.0';
      self.dModel = '5.0';
      self.dLat = '28.5165471';
      self.dLong = '77.2808813';
      self.dAlt = '77.2808813';
      self.dNet = 0; // means offline

      var control = 0;

      function setStart(s) {
        self.start = s;
      }

      function getStart() {
        return self.start;
      }

      function setDNet(n) {
        self.dNet = n;
      }

      function getDNet() {
        return self.dNet;
      }

      function setDLat(lt) {
        self.dLat = lt;
      }

      function getDLat() {
        return self.dLat;
      }

      function setDLong(lg) {
        self.dLong = lg;
      }

      function getDLong() {
        return self.dLong;
      }

      function getDAlt() {
        return self.dAlt;
      }

      function setDAlt(a) {
        self.dAlt = a;
      }

      function getDName() {
        return self.dName;
      }

      function setDName(n) {
        self.dName = n;
      }

      function getDCordova() {
        return self.dCordova;
      }

      function setDCordova(c) {
        self.dCordova = c;
      }

      function getDPlatform() {
        return self.dPlatform;
      }

      function setDPlatform(p) {
        self.dPlatform = p;
      }

      function getDUuid() {
        return self.dUuid;
      }

      function setDUuid(u) {
        self.dUuid = u;
      }

      function getDVersion() {
        return self.dVersion;
      }

      function setDVersion(v) {
        self.dVersion = v;
      }

      function getDModel() {
        return self.dModel;
      }

      function setDModel(m) {
        self.dModel = m;
      }

      function updateCordova() {

        toastr.info('update cordova');

        var sql = 'UPDATE app SET p1="';
        sql += getDModel();
        sql += '" AND p2="';
        sql += getDVersion();
        sql += '" AND p3="';
        sql += getDUuid();
        sql += '" AND p4="';
        sql += getDName();
        sql += '" AND p5="';
        sql += getDPlatform();
        sql += '" WHERE f1="cordova"';

        toastr.info(sql);

        //console.log(sql);
        var cor2 = $q.defer();

        try {

          $rootScope.db.transaction(function (tx) {
            tx.executeSql(sql, [], function (tx, results) {
              //toastr.success('success sql update query from appSql');
              setStart(1);
              cor2.resolve(results);
            }, function (results) {
              cor2.reject(results);
            });
          });

        } catch (e) {

        }

        return cor2.promise;

      }

      function askLocation() {
        $ionicLoading.show();
        //toastr.info('ask location');
        if(clf) {
          $ionicLoading.hide();
          return false;
        }

        //var posOptions = {timeout: 10000, enableHighAccuracy: false};
        var posOptions = {timeout: 3000, enableHighAccuracy: false};

        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
//toastr.success('found')
            setDLat(position.coords.latitude); // 28.5165471
            setDLong(position.coords.longitude); // 77.2808813
            setDAlt(position.coords.altitude); // null

            //if (getStart() == 0) {
            //  init();
            //updateCordova();
            //}
            clf = true;
            //toastr.success('success location found');
            $ionicLoading.hide();
            //return true;

          }, function (error) {

            $ionicLoading.show();
toastr.error('not found')
            try {
              //$cordovaDialogs.alert('Kindly turn on location sensor for your device.', 'ONM', 'Go to location settings!')
              $cordovaDialogs.alert('Kindly turn on location sensor for your device.', 'ONM', 'Retry Now!')
                .then(function () {
                  //cordova.plugins.diagnostic.switchToLocationSettings();
                  //cordova.exec(function() {
                  //    askLocation();
                  //  },
                  //  function() {},
                  //  "diagnostic",
                  //  "switchToLocationSettings",
                  //  []);
                  if ($cordovaNetwork.isOnline()) {
                    $timeout(function () {
                      askLocation();
                    }, gvar.wait5);
                  } else {
                    control = 0;
                    askConnect();
                  }

                });
            } catch (e3) {
              //toastr.error(e3.message);
              //toastr.error('Kindly turn on location sensor for your device.');
            }
          });

      }

      function askConnect() {

        //toastr.info('ask Connect');
        try {
          //toastr.success($cordovaNetwork.isOffline());

          if (!navigator.onLine) {

            //toastr.info('ask Connect is Offline');

            try {
              $cordovaDialogs.alert('Kindly connect your device to network to make application work.', 'ONM', 'Retry again after connecting')
                .then(function () {

                  if (navigator.onLine) {
                    askLocation();
                    setStart(1);
                    control = 1;
                  } else {
                    control = 0;
                    askConnect();
                  }

                });
            } catch (e2) {

              //toastr.error(e2.message);
              toastr.error('Kindly connect your device to network to make application work.');

              if ($cordovaNetwork.isOnline()) {
                askLocation();
                //setStart(1);
                control = 1;
              } else {
                control = 0;
                askConnect();
              }

            }

          } else {

            //toastr.info('ask Connect is not Offline');
            //if(getStart == 0){
            askLocation();
            //}

          }

        } catch (e1) {
          toastr.error('catch error from cordova ask connect')
          toastr.error(e1.code);
          toastr.error(e1.message);

        }

      }

      function ask() {

        //toastr.error('catch error from ');
        askConnect();

      }

      function init() {

        //toastr.info('cordova init');
        var cor1 = $q.defer();

        try {

          if (typeof device != 'undefined') {

            setDName(device.name); // device brand name and model name
            setDCordova(device.cordova); // cordova version
            setDPlatform(device.platform);
            setDUuid(device.uuid);
            setDVersion(device.version);
            setDModel(device.model);

            if ($cordovaNetwork.isOnline()) {
              setDNet('1');
            } else {
              setDNet('0');
            }

            $cordovaGeolocation
              .getCurrentPosition(posOptions)
              .then(function (position) {
                setDLat(position.coords.latitude); // 28.5165471
                setDLong(position.coords.longitude); // 77.2808813
                setDAlt(position.coords.altitude); // null

                updateCordova();

                cor1.resolve(true);
              }, function (error) {
                cor1.resolve(error.code);
              });

          } else {
            toastr.error('device not found 1');
            cor1.resolve(false);
          }
        } catch (e) {
          toastr.error('device not found 2');
          cor1.resolve(false);
        }

        return cor1.promise;
      }

      function beforeListCheck() {
        try {
          if ($cordovaNetwork.isOnline()) {
            setDNet('1');
            askConnect();
          } else {
            askConnect();
            setDNet('0');
          }
        } catch (e) {
          //toastr.error('Not a device cordova beforeListCheck');
        }
      }

      return {
        setStart: setStart,
        getStart: getStart,
        setDNet: setDNet,
        getDNet: getDNet,
        setDLat: setDLat,
        getDLat: getDLat,
        setDLong: setDLong,
        getDAlt: getDAlt,
        setDAlt: setDAlt,
        getDLong: getDLong,
        getDName: getDName,
        getDCordova: getDCordova,
        getDPlatform: getDPlatform,
        getDUuid: getDUuid,
        getDVersion: getDVersion,
        getDModel: getDModel,
        setDName: setDName,
        setDCordova: setDCordova,
        setDPlatform: setDPlatform,
        setDUuid: setDUuid,
        setDVersion: setDVersion,
        setDModel: setDModel,
        updateCordova: updateCordova,
        askLocation: askLocation,
        askConnect: askConnect,
        ask: ask,
        init: init,
        beforeListCheck: beforeListCheck
      };

      // listen for Online event
      //$rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
      $rootScope.$on('$cordovaNetwork:online', function () {
        //var onlineState = networkState;
        if (self.start > 0) {
          setDNet('1');
          control = 1;
          askLocation();
        }
      });

      // listen for Offline event
      //$rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
      $rootScope.$on('$cordovaNetwork:offline', function () {
        //var offlineState = networkState;
        if (self.start > 0) {
          setDNet('0');
          control = 0;
          askConnect();
        }
      });

    });


})();
