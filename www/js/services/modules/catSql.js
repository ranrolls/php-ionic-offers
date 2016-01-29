(function () {

  'use strict';

  angular.module('service')

    .factory('catSql', function ($timeout, $q, toastr, gvar) {

      var createQuery = "a";
      var passVar;

      self.control = 0;
      self.resultSet = [];

      self.appTblStructure = ["id", "f1", "f2", "p1", "p2", "p3", "p4", "p5"];

      self.catTblStruction = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c9",
        "c10", "c11", "c12", "c13", "c14", "c15", "c16", "c17", "c18", "c19",
        "c20", "c21", "c22", "c23", "c24", "c25"];

      var db = openDatabase('onm2016', '1.0', 'description', 1 * 1024 * 1024);

      function ping() {
        if (gvar.development) toastr.info('ping');
      }

      function setResultSet(rs) {
        //console.log(rs);
        self.resultSet = rs;
      }

      function getResultSet() {
        return self.resultSet;
      }

      function setVariable(r) {
        //console.log(r);
        passVar = r;
      }

      function getVariable() {
        //console.log(passVar);
        return passVar;
      }

      function selects() {
        try {
          //var sql = 'SELECT ' + field + ' FROM app WHERE f1="' + where + '"';
          var sql = 'SELECT *  FROM cat LIMIT 1';
          var def11 = $q.defer();
          db.transaction(function (tx) {
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
          if (gvar.development) toastr.error(e);
        } finally {
          //console.log(r);
        }
        return def11.promise;
        //return r;
      }

      function select(where, field, rnd) {
        if (typeof rnd === 'undefined') {
          rnd = new Date().getTime();
        }
        var def10 = $q.defer();
        try {
          var sql = 'SELECT ' + field + ' FROM app WHERE f1="' + where + '"';
          db.transaction(function (tx) {
            tx.executeSql(sql, [], function (tx, results) {
              //console.log(results);
              //r = results.rows.item(0)[field];
              //console.log(r[field]);
              //console.log(r);
              def10.resolve(results.rows.item(0)[field]);
            }, function () {
              def10.reject(false);
              //$scope.$apply(function () {
              //  $scope.control = 3;
              //});

            });
          });
        } catch (e) {
          if (gvar.development) toastr.error(e);
        }

        return def10.promise;
        //return r;
      }

      function update(field, value) {
        //var sql = 'UPDATE Customers SET ContactName="Alfred Schmidt", City="Hamburg" WHERE CustomerName="Alfreds Futterkiste"';
        var sql = 'UPDATE cat SET ' + field + '="' + value + '"';

        try {
          db.transaction(function (tx) {
            tx.executeSql(sql, [], function (tx, results) {
              //console.log(results);
              //r = results.rows.item(0)[field];
              //console.log(r);
              //setVariable(1);
            }, function () {
              //setVariable(0);
            });
          });
        } catch (e) {
          if (gvar.development) toastr.error(e);
        }
      }

      return {
        selects: selects,
        update: update,
        getVariable: getVariable,
        select: select,
        getResultSet: getResultSet,
        setResultSet: setResultSet,
        control: control,
        ping: ping
      };

    });


})();
