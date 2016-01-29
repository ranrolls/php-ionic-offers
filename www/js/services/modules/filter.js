(function () {

  'use strict';

  angular.module('service')

    .factory('filter', function ($timeout, $q, toastr, gvar, appSql) {

      self.radius = 250;
      self.offerBy = 'products';

      function setRadius(r) {
        self.radius = r;
      }

      function getRadius() {
        if (typeof self.radius != 'undefined') {
          return self.radius;
        } else {
          self.radius = 250;
          return self.radius;
        }
      }

      function getOfferBy() {
        if (typeof self.offerBy != 'undefined') {
          return self.offerBy;
        } else {
          self.offerBy = 'products';
          return self.offerBy;
        }
      }

      function setOfferBy(o) {
        self.offerBy = o;
      }

      function ping() {
        appSql.ping();
      }

      function startSql() {
        var def32 = $q.defer();

        appSql.check().then(function (a) {
          //console.log(a)
          def32.resolve(a);
        });

        return def32.promise;
      }

      function getSqlArgs() {
        var def31 = $q.defer();

        appSql.selects('filter').then(
          function (rs) {
            //console.log(rs);
            setRadius(rs.p1);
            setOfferBy(rs.p2);
            def31.resolve(getRadius());
          });

        return def31.promise;
      }

      function setSqlArgs(r, o) {
        var def33 = $q.defer();

        appSql.update('filter', 'p1', r).then(function (d1) {
          appSql.update('filter', 'p2', o).then(function (d2) {
            setRadius(r);
            setOfferBy(o);
            def33.resolve(d2);
          });
        });

        return def33.promise;
      }

      function updateOfferBy(o) {
        var def34 = $q.defer();

        appSql.update('filter', 'p2', o).then(function (d3) {
          setOfferBy(o);
          def34.resolve(d3);
        });

        return def34.promise;
      }

      function updateRadius(r){
        var def35 = $q.defer();

        appSql.update('filter', 'p1', r).then(function (d5) {
          setRadius(r);
          def35.resolve(d5);
        });

        return def35.promise;
      }


      return {
        getSqlArgs: getSqlArgs,
        setSqlArgs: setSqlArgs,
        startSql: startSql,
        ping: ping,
        getRadius: getRadius,
        setRadius: setRadius,
        getOfferBy: getOfferBy,
        setOfferBy: setOfferBy,
        updateOfferBy: updateOfferBy,
        updateRadius : updateRadius
      };

    });

})();
