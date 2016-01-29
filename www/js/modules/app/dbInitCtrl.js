(function () {

  'use strict';

  angular.module('starter.controllers').controller('DbInitCtrl',
    function ($state, $scope, $timeout, $ionicLoading, toastr, appSql, gvar, gety, filter) {

      //$ionicLoading.show();

      var db;

      $scope.show = false;

      //toastr.info('preparing db for first time usage');

      function gin() {
        if (gvar.development) toastr.success('gin');
        //if(gvar.development) console.log('gin');
        gety.pullHibernate().then(function (ph) {
          //console.log(ph);
          gety.removeFirstStart().then(function (rf) {
            //console.log(rf);
            $ionicLoading.hide();
            $state.go('tab.filter');
          })
        });
      }

      function out(c) {
        if (gvar.development) toastr.success('out');
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
            $state.go('tab.filter');
          }
        });
      }

      function route() {
        if (gvar.development) toastr.success('route');
        //if(gvar.development) console.log('route');
        filter.getSqlArgs().then(function (r) {
          //$scope.form.range = r;
          //$scope.form.offerBy = filter.getOfferBy();
          //if(gvar.development) console.log('before calling gety at init -> filter ctrl');
          gety.selectCurrentState().then(function (c) {
            //if(gvar.development) console.log(c);
            if (c != 'tab.filter') {
              $timeout(out(c), gvar.wait3);
            } else {
              $timeout(gin, gvar.wait2);
            }
          });
        });
      }

      $scope.start = function () {
        $ionicLoading.show();
        init();
      }

      function init() {

        //toastr.info('db init');

        appSql.create().then(function (b) {

          //toastr.info('result from db create = ' + b);
          if (b) {
            $timeout(route, gvar.wait3);
          } else {
            toastr.error('Unable to initiate db properly');
            toastr.info('Kindly restart application for proper initialisation');
          }

        }, function () {

          toastr.error('no return value from appSql create at startCtrl');

        });

      };

      var vm = this;

      vm.ping = function () {
        console.log('ping from login ctrl');
      }

      $ionicLoading.show();

      $timeout(function () {

        db = openDatabase('onm2016', '1.0', 'description', 1 * 1024 * 1024);

        //var a3 = $q.defer();
        var uid = "null", model = "null", version = "null", platform = "null";

        try {

          if (typeof device !== "undefined") {
            uid = device.uuid;
            model = device.model;
            version = device.version;
            platform = device.platform;
          }else{
            toastr.error('device not found');
          }

          db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS app (f1 VARCHAR, f2 VARCHAR, p1 VARCHAR, p2 VARCHAR, p3 VARCHAR, p4 VARCHAR, p5 VARCHAR)');
            tx.executeSql('INSERT INTO app (f1,p1,p2,p3,p4) VALUES ("state","tab.filter","1","0","0")');
            tx.executeSql('INSERT INTO app (f1,p1,p2,p3,p4) VALUES ("setting","0","0","0","0")');
            tx.executeSql('INSERT INTO app (f1,p1,p2,p3) VALUES ("filter","250","products","0")');
            tx.executeSql('INSERT INTO app (f1) VALUES ("map")');
            tx.executeSql('INSERT INTO app (f1,p1,p2,p3,p4) VALUES ("cordova",' + uid + ',' + model + ',' + version + ',' + platform + ')');
            tx.executeSql('CREATE TABLE IF NOT EXISTS cat (c1 VARCHAR, c2 VARCHAR, c3 VARCHAR, c4 VARCHAR,' +
              ' c5 VARCHAR, c6 VARCHAR, c7 VARCHAR, c8 VARCHAR, c9 VARCHAR, c10 VARCHAR, c11 VARCHAR, c12 VARCHAR, ' +
              'c13 VARCHAR, c14 VARCHAR, c15 VARCHAR, c16 VARCHAR, c17 VARCHAR, c18 VARCHAR, c19 VARCHAR, c20 VARCHAR, ' +
              'c21 VARCHAR, c22 VARCHAR, c23 VARCHAR, c24 VARCHAR, c25 VARCHAR)');
            tx.executeSql('INSERT INTO cat (c1) VALUES ("0")',[],function(tx,res){
              //$timeout(route, gvar.wait3);
            },function(){

            });
            tx.executeSql('SELECT * FROM app LIMIT 1', [], function (tx, results) {
              //if (gvar.development) toastr.success('Database records success updated');
              //a3.resolve(true);
              //dropCat();
              //dropApp();
              $timeout(route, gvar.wait1);
            }, function () {
              //if (gvar.development) toastr.error('Database records update failed');
              //a3.resolve(false);

            });
          });

        }catch(e){

          toastr.error('No device found while preparing application data');

        }finally {

          //db.transaction(function (tx) {
          //  tx.executeSql('CREATE TABLE IF NOT EXISTS app (f1 VARCHAR, f2 VARCHAR, p1 VARCHAR, p2 VARCHAR, p3 VARCHAR, p4 VARCHAR, p5 VARCHAR)');
          //  tx.executeSql('INSERT INTO app (f1,p1,p2,p3,p4) VALUES ("state","tab.filter","1","0","0")');
          //  tx.executeSql('INSERT INTO app (f1,p1,p2,p3,p4) VALUES ("setting","0","0","0","0")');
          //  tx.executeSql('INSERT INTO app (f1,p1,p2,p3) VALUES ("filter","250","products","0")');
          //  tx.executeSql('INSERT INTO app (f1) VALUES ("map")');
          //  tx.executeSql('INSERT INTO app (f1,p1,p2,p3,p4) VALUES ("cordova",' + uid + ',' + model + ',' + version + ',' + platform + ')');
          //  tx.executeSql('CREATE TABLE IF NOT EXISTS cat (c1 VARCHAR, c2 VARCHAR, c3 VARCHAR, c4 VARCHAR,' +
          //    ' c5 VARCHAR, c6 VARCHAR, c7 VARCHAR, c8 VARCHAR, c9 VARCHAR, c10 VARCHAR, c11 VARCHAR, c12 VARCHAR, ' +
          //    'c13 VARCHAR, c14 VARCHAR, c15 VARCHAR, c16 VARCHAR, c17 VARCHAR, c18 VARCHAR, c19 VARCHAR, c20 VARCHAR, ' +
          //    'c21 VARCHAR, c22 VARCHAR, c23 VARCHAR, c24 VARCHAR, c25 VARCHAR)');
          //  tx.executeSql('INSERT INTO cat (c1) VALUES ("0")',[],function(tx,res){
          //    //$timeout(route, gvar.wait3);
          //  },function(){
          //
          //  });
          //  tx.executeSql('SELECT * FROM app LIMIT 1', [], function (tx, results) {
          //    if (gvar.development) toastr.success('Database records success updated');
          //    //a3.resolve(true);
          //    //dropCat();
          //    //dropApp();
          //    $timeout(route, gvar.wait1);
          //  }, function () {
          //    if (gvar.development) toastr.error('Database records update failed');
          //    //a3.resolve(false);
          //
          //  });
          //});
        }

        //return a3.promise;

        //$scope.show = true;
        //$ionicLoading.hide();

      }, 5000);

      //init();

    });

})();
