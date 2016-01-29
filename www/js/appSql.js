(function () {

  'use strict';

  //var db = openDatabase('onm2016', '1.0', 'description', 1 * 1024 * 1024);

  angular.module('service')

    .factory('appSql', function ($rootScope, $timeout, $q, toastr, gvar) {

      var createQuery = "a";
      var passVar;

      //$rootScope.db = openDatabase('onm2016', '1.0', 'description', 1 * 1024 * 1024);

      self.control = 0;
      self.resultSet = [];

      self.appTblStructure = ["id", "f1", "f2", "p1", "p2", "p3", "p4", "p5"];

      self.catTblStruction = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c9",
        "c10", "c11", "c12", "c13", "c14", "c15", "c16", "c17", "c18", "c19",
        "c20", "c21", "c22", "c23", "c24", "c25"];

      //var db = openDatabase('onm2016', '1.0', 'description', 1 * 1024 * 1024);
      // 1 * 1024 * 1024 = 1mb
      // 1 * 1024 * 100 = 1 / 10 mb

      function openDb() {
        var as1 = $q.defer();

        $rootScope.db = openDatabase('onm2016', '1.0', 'description', 1 * 1024 * 1024);

        as1.resolve($rootScope.db);

        return as1.promise;
      }

      function dropApp() {
        $rootScope.db.transaction(function (tx) {
          tx.executeSql('DROP TABLE app');
        });
      }

      function dropCat() {
        $rootScope.db.transaction(function (tx) {
          tx.executeSql('DROP TABLE cat');
        });
      }

      function create() {

        //toastr.info('Preparing application database');
        //var db = openDatabase('onm2016', '1.0', 'description', 1 * 1024 * 1024);

        var a3 = $q.defer();
        var uid = "null", model = "null", version = "null", platform = "null";

        try {
          if (typeof device !== "undefined") {
            uid = device.uuid;
            model = device.model;
            version = device.version;
            platform = device.platform;
          } else {
            //toastr.error('no device found');
          }

          $rootScope.db.transaction(function (tx) {
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
            tx.executeSql('INSERT INTO cat (c1) VALUES ("0")');
            tx.executeSql('SELECT * FROM app LIMIT 1', [], function (tx, results) {
              //if (gvar.development) toastr.success('Database records success updated');
              a3.resolve(true);
            }, function () {
              //if (gvar.development) toastr.error('Database records update failed');
              a3.resolve(false);
            });
          });

        } catch (e) {
          a3.resolve(false);
          //toastr.error('No device found while preparing application data');
        } finally {

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
          //  tx.executeSql('INSERT INTO cat (c1) VALUES ("0")');
          //  tx.executeSql('SELECT * FROM app LIMIT 1', [], function (tx, results) {
          //    if (gvar.development) toastr.success('Database records success updated');
          //    a3.resolve(true);
          //    //dropCat();
          //    //dropApp();
          //  }, function () {
          //    if (gvar.development) toastr.error('Database records update failed');
          //    a3.resolve(false);
          //  });
          //});
        }

        return a3.promise;
      }

      function check() {

        //toastr.info($rootScope.db);

        //toastr.info('in appSql check func');
        var def2 = $q.defer();
        //var db = openDatabase('onm2016', '1.0', 'description', 1 * 1024 * 1024);

        try {
          $rootScope.db.transaction(function (tx) {

            tx.executeSql('SELECT * FROM cat LIMIT 1', [], function (tx, results) {

              //if (gvar.development) toastr.success('records found in appSql check func');
              def2.resolve(true);

              //dropAllTables();

            }, function () {

              //if (gvar.development) toastr.error('records not found in appSql check func');

              //create().then(function (a) {
              def2.resolve(false);
              //});

            });
          });
        } catch (e) {
          //if (gvar.development) toastr.error(e);
        }
        return def2.promise;

      }

      function ping() {
        if (gvar.development) toastr.info('ping');
      }

      function setVariable(r) {
        console.log(r);
        passVar = r;
      }

      function getVariable() {
        //console.log(passVar);
        return passVar;
      }

      function select(where, field) {
        var r, def0 = $q.defer();
        try {
          var sql = 'SELECT ' + field + ' FROM app WHERE f1="' + where + '"';
          //console.log(sql);
          $rootScope.db.transaction(function (tx) {
            tx.executeSql(sql, [], function (tx, results) {
              //console.log(results);
              //r = results.rows.item(0)[field];
              //def0.resolve(r);
              def0.resolve(results.rows.item(0)[field]);
            }, function () {
              def0.reject(false);
            });
          });
        } catch (e) {
          //if (gvar.development) toastr.error(e);
        } finally {
          return def0.promise;
        }
        return def0.promise;
      }

      function update3(w,f1,v1,f2,v2,f3,v3){
        //var sql = 'UPDATE Customers SET ContactName="Alfred Schmidt", City="Hamburg" WHERE CustomerName="Alfreds Futterkiste"';
        var sql = 'UPDATE app SET ';

        sql += f1;
        sql += '="';
        sql += v1;
        sql += '", ';
        sql += f2;
        sql += '="';
        sql += v2;
        sql += '", ';
        sql += f3;
        sql += '="';
        sql += v3;
        sql += '"';
        sql += ' WHERE f1="';
        sql += w;
        sql += '";';

        //console.log(sql);
        var as1 = $q.defer();
        try {
          $rootScope.db.transaction(function (tx) {
            tx.executeSql(sql, [], function (tx, results) {
              //console.log(results);
              //r = results.rows.item(0)[field];
              //console.log(r);
              //console.log('success sql update query from appSql');
              as1.resolve(results);
            }, function (results) {
              as1.reject(results);
            });
          });
        } catch (e) {
          //if (gvar.development) toastr.error(e);
        }
        return as1.promise;
      }

      function update(where, field, value) {
        //var sql = 'UPDATE Customers SET ContactName="Alfred Schmidt", City="Hamburg" WHERE CustomerName="Alfreds Futterkiste"';
        var sql = 'UPDATE app SET ' + field + '="' + value + '" WHERE f1="' + where + '"';
        //console.log(sql);
        var def1 = $q.defer();
        try {
          $rootScope.db.transaction(function (tx) {
            tx.executeSql(sql, [], function (tx, results) {
              //console.log(results);
              //r = results.rows.item(0)[field];
              //console.log(r);
              //console.log('success sql update query from appSql');
              def1.resolve(results);
            }, function (results) {
              def1.reject(results);
            });
          });
        } catch (e) {
          //if (gvar.development) toastr.error(e);
        }
        return def1.promise;
      }

      function selects(where) {
        try {
          var sql = 'SELECT * FROM app WHERE f1="' + where + '"';
          //var sql = 'SELECT *  FROM cat LIMIT 1';
          var def11 = $q.defer();
          $rootScope.db.transaction(function (tx) {
            tx.executeSql(sql, [], function (tx, results) {
              //console.log(results);
              //r = results.rows.item(0)[field];
              //console.log(r[field]);
              //console.log(r);
              //setResultSet(results.rows.item(0));
              def11.resolve(results.rows.item(0));
              //setVariable(results.rows.item(0)[field]);
            }, function () {
              //$scope.$apply(function () {
              //  $scope.control = 3;
              //});
              def11.reject(false);
            });
          });
        } catch (e) {
          //if (gvar.development) toastr.error(e);
        } finally {
          //console.log(r);
        }
        return def11.promise;
        //return r;
      }

      function dropAllTables() {
        dropApp();
        dropCat();
      }


      return {
        openDb: openDb,
        update3: update3,
        update: update,
        getVariable: getVariable,
        select: select,
        create: create,
        check: check,
        resultSet: resultSet,
        control: control,
        ping: ping,
        selects: selects,
        dropAllTables: dropAllTables
      };

    });

})();
