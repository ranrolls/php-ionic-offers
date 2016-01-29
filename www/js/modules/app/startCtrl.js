(function () {

  'use strict';

  angular.module('starter.controllers').controller('StartCtrl', function ($rootScope, $state, $scope, $document, $timeout, $ionicLoading, toastr, appSql, gvar, gety, filter) {

    $ionicLoading.show();

    $('#listSearchToggle').hide();

    var tut = false; var dev = gvar.fastDev;
    //tut = true;

    function gin() {
      //if (gvar.development) toastr.success('gin');
      //if(gvar.development) console.log('gin');
      gety.pullHibernate().then(function (ph) {
        //console.log(ph);
        gety.removeFirstStart().then(function (rf) {
          //console.log(rf);
          $ionicLoading.hide();
          //if (gvar.development) toastr.success('state go tab.list');
          $state.go('tab.list');
        })
      });
    }

    function out(c) {
      //if (gvar.development) toastr.success('out');
      //if(gvar.development) console.log('out');
      gety.isHibernate().then(function (h) {
        //if(gvar.development) console.log(h);
        if (h) {
          gety.removeFirstStart().then(function (f) {
            if (h) {
              $ionicLoading.hide();
              //if(gvar.development) console.log(c);
              $state.go(c);
            }
          });
        } else {
          $ionicLoading.hide();
          $state.go('tab.list');
        }
      });
    }

    function route() {
      //if (gvar.development) toastr.success('route');
      //if(gvar.development) console.log('route');
      if (tut) {
        $ionicLoading.hide();
        $state.go('tut');
      } else {
        filter.getSqlArgs().then(function (r) {
          //$scope.form.range = r;
          //$scope.form.offerBy = filter.getOfferBy();
          //if(gvar.development) console.log('before calling gety at init -> filter ctrl');
          gety.selectCurrentState().then(function (c) {
            //if(gvar.development) console.log(c);
            if (c != 'tab.list') {
              $timeout(out(c), gvar.wait3);
            } else {
              $timeout(gin, gvar.wait2);
            }
          });
        });
      }
    }

    function init() {

      //angular.element($document.find('#tut')).css('display', 'none');

      //$ionicLoading.show();
      //if(gvar.development) console.log('init');
      //if (gvar.development) toastr.info('init');

      appSql.check().then(function (a) {
        //filter.startSql().then(function (a) {

        //toastr.info('from startCtrl');
        //toastr.info(a);

        if (a) {

          //toastr.success('db found');

          //$rootScope.db.transaction(function (tx) {
          //  tx.executeSql('DROP TABLE app');
          //  tx.executeSql('DROP TABLE cat');
          //});

          $timeout(route, gvar.wait3);

        } else {

          //
          //toastr.error('db not found');
          //$ionicLoading.hide();
          //$state.go('dbInit');

          //appSql.create().then(function (b) {
          //
          //  //toastr.info('result from db create = ' + b);
          //  if (b) {
          //    $timeout(route, gvar.wait3);
          //  } else {
          //    toastr.error('error from appSql Create at start Ctrl');
          //    //toastr.error('Unable to initiate db properly');
          //    //toastr.info('Kindly restart application for proper initialisation');
          //  }
          //
          //},function(e){
          //  //toastr.error('no return value from appSql create at startCtrl');
          //});

          //var uid = "null", model = "null", version = "null", platform = "null";

          try {

            //if (typeof device !== "undefined") {
            //

            //  uid = device.uuid;
            //  model = device.model;
            //  version = device.version;
            //  platform = device.platform;
            //
            //} else {
            //
            //  toastr.error('no device found');
            //
            //}

            $rootScope.db.transaction(function (tx) {

              tx.executeSql('CREATE TABLE IF NOT EXISTS app (f1 VARCHAR, f2 VARCHAR, p1 VARCHAR, p2 VARCHAR, p3 VARCHAR, p4 VARCHAR, p5 VARCHAR)');
              //tx.executeSql('INSERT INTO app (f1,p1,p2,p3,p4) VALUES ("state","tab.list","1","0","0")');
              tx.executeSql('INSERT INTO app (f1,p1,p2,p3,p4) VALUES ("state","tab.list","0","1","0")');
              tx.executeSql('INSERT INTO app (f1,p1,p2,p3,p4) VALUES ("setting","0","0","0","0")');
              tx.executeSql('INSERT INTO app (f1,p1,p2,p3) VALUES ("filter","250","products","0")');
              tx.executeSql('INSERT INTO app (f1) VALUES ("map")');

              //tx.executeSql('INSERT INTO app (f1,p1,p2,p3,p4) VALUES ("cordova",' + uid + ',' + model + ',' + version + ',' + platform + ')');
              //tx.executeSql('INSERT INTO app (f1,p1,p2,p3,p4) VALUES ("cordova",' + "null" + ',' + "null" + ',' + "null" + ',' + "null" + ')');

              tx.executeSql('INSERT INTO app (f1,p1,p2,p3,p4) VALUES ("cordova","null","null","null","null")');
              tx.executeSql('CREATE TABLE IF NOT EXISTS cat (c1 VARCHAR, c2 VARCHAR, c3 VARCHAR, c4 VARCHAR, c5 VARCHAR, c6 VARCHAR, c7 VARCHAR, c8 VARCHAR, c9 VARCHAR, c10 VARCHAR, c11 VARCHAR, c12 VARCHAR, c13 VARCHAR, c14 VARCHAR, c15 VARCHAR, c16 VARCHAR, c17 VARCHAR, c18 VARCHAR, c19 VARCHAR, c20 VARCHAR, c21 VARCHAR, c22 VARCHAR, c23 VARCHAR, c24 VARCHAR, c25 VARCHAR)');
              tx.executeSql('INSERT INTO cat (c1) VALUES ("0")');
              tx.executeSql('SELECT * FROM app LIMIT 1', [], function (tx, results) {
                //if (gvar.development) toastr.success('Database records success updated');
                //a3.resolve(true);
                if(!dev) tut = true;
                $timeout(route, gvar.wait3);
              }, function () {
                //if (gvar.development) toastr.error('Database records update failed');
                //a3.resolve(false);
              });

            });

          } catch (e) {

            //toastr.error('from start ctrl');
            //toastr.error(e.message);
            //a3.resolve(false);
            //toastr.error('No device found while preparing application data');

          }

        }

      });
    };

    var vm = this;

    vm.ping = function () {
      console.log('ping from login ctrl');
    }

    $timeout(init, gvar.wait1);

  });

})();
