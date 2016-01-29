(function () {

  'use strict';

  angular.module('service')

    .factory('user', function ($q, toastr, gvar, appSql) {

      var tableField = 'setting';

      self.status = 0;

      function getStatus() {
        return self.status;
      }

      function setStatus(b) {
        self.status = b;
      }

      function getSqlLogin() {
        var def61 = $q.defer();

        appSql.select(tableField, gvar.defaultParamFeild).then(function (dt) {
          //var r = parseInt(dt);
          //console.log(r);
          //console.log(isNumber(r));
          if(parseInt(dt) == 0){
            setStatus(0);
            def61.resolve(parseInt(dt));
          }else if(parseInt(dt) == 1){
            setStatus(1);
            def61.resolve(parseInt(dt));
          }else{
            setStatus(0);
            def61.resolve(parseInt(dt));
          }
        });

        return def61.promise;
      }

      function setSqlLogin(val) {

        var def62 = $q.defer();

        appSql.update(tableField, gvar.defaultParamFeild, val).then(function (dt) {
          setStatus(val);
          def62.resolve(dt);
          //console.log(dt);
        });

        return def62.promise;
      }

      function toggleLogin() {

        var value = 0, def63 = $q.defer();

        getSqlLogin().then(function(dt1){
          console.log(dt1);
          if (dt1 == 0) {
            value = 1;
          } else {
            value = 0;
          }
          console.log(value);
          setSqlLogin(value).then(function (dt) {
            setStatus(value);
            def63.resolve(dt);
          });
        });

        return def63.promise;
      }

      function login(){
        return setStatus(1);
      }

      function logout(){
        return setStatus(0);
      }


      return {
        status: status,
        getStatus: getStatus,
        setStatus: setStatus,
        getSqlLogin: getSqlLogin,
        setSqlLogin: setSqlLogin,
        toggleLogin: toggleLogin,
        login : login,
        logout : logout
      };

    });


})();
