(function () {

  'use strict';

  angular.module('service')

    .factory('gety', function ($timeout, $q, toastr, gvar, appSql) {

      self.currentState = gvar.defaultInitialState;

      self.firstStart = true;

      self.reached = false;

      self.param3 = '', self.param4 = '', self.param5 = '', self.targetState = '';

      var tableFeild = 'state';

      function setTargetState(s){
        self.targetState = s;
      }

      function getTargetState(){
        return self.targetState;
      }

      function setReached(b){
        self.reached = b;
      }

      function getReached(){
        return self.reached;
      }

      function setParam3(p3) {
        self.param3 = p3;
      }

      function setParam4(p4) {
        self.param4 = p4;
      }

      function setParam5(p5) {
        self.param5 = p5;
      }

      function getParam3() {

        var gt3 = $q.defer();
        appSql.select(tableFeild, gvar.defaultParamFeild3).then(function (dt) {
          //console.log(dt);
          setParam3(dt);
          gt3.resolve(dt);
        });
        return gt3.promise;

      }

      function getParam4() {

        var gt4 = $q.defer();
        appSql.select(tableFeild, gvar.defaultParamFeild4).then(function (dt) {
          //console.log(dt);
          setParam4(dt);
          gt4.resolve(dt);
        });
        return gt4.promise;

      }

      function getParam5() {

        var gt5 = $q.defer();
        appSql.select(tableFeild, gvar.defaultParamFeild5).then(function (dt) {
          //console.log(dt);
          setParam5(dt);
          gt5.resolve(dt);
        });
        return gt5.promise;

      }

      function updateParam3(p3) {

        var de48 = $q.defer();

        appSql.update(tableFeild, gvar.defaultParamFeild3, p3).then(function (up) {
          setParam3(p3);
          de48.resolve(p3);
        });

        return de48.promise;

      }

      function updateParam4(p4) {

        var def48 = $q.defer();

        appSql.update(tableFeild, gvar.defaultParamFeild4, p4).then(function (up) {
          setParam4(p4);
          def48.resolve(p4);
        });

        return def48.promise;
      }

      function updateParam5(p5) {


        var def49 = $q.defer();

        appSql.update(tableFeild, gvar.defaultParamFeild5, p5).then(function (up) {
          setParam5(p5);
          def49.resolve(p5);
        });
        return def49.promise;
      }

      function updateAll(c, sc, p) {


        var gety1 = $q.defer();

        appSql.update3(tableFeild, gvar.defaultParamFeild3, c, gvar.defaultParamFeild4, sc, gvar.defaultParamFeild5, p).then(function (t) {

          setParam5(c);
          setParam5(sc);
          setParam5(p);

          gety1.resolve(true);
        });

        return gety1.promise;
      }


      function ping() {

        toastr.info('ping from gety');

      }

      function isFirstStart() {

        var def44 = $q.defer();
        def44.resolve(self.firstStart);
        if(self.firstStart){
          selectCurrentState().then(function(cs){
            setTargetState(cs);
          });
        }
        return def44.promise;
      }

      function removeFirstStart() {

        var def43 = $q.defer();
        //if(self.firstStart){
        self.firstStart = false;
        def43.resolve(self.firstStart);
        //}else{
        //  self.firstStart = true;
        //  def43.resolve(self.firstStart);
        //}
        return def43.promise;
        //self.firstStart = !self.firstStart;
      }

      function setCurrentState(st) {

        self.currentState = st;
      }

      function getCurrentState() {

        return self.currentState;
      }

      function updateCurrentState(st) {

        var def45 = $q.defer();

        appSql.update(tableFeild, gvar.defaultParamFeild, st).then(function (cs) {
          setCurrentState(st);
          def45.resolve(cs);
        });

        return def45.promise;
      }

      function pullHibernate() {

        var def47 = $q.defer();

        appSql.update(tableFeild, gvar.defaultParamFeild2, '0').then(function (h) {
          def47.resolve(h);
        });

        return def47.promise;

      }

      function pushHibernate() {

        var def46 = $q.defer();

        appSql.update(tableFeild, gvar.defaultParamFeild2, '1').then(function (h) {
          def46.resolve(h);
        });

        return def46.promise;

      }


      function selectCurrentState() {

        var def42 = $q.defer();
        appSql.select(tableFeild, gvar.defaultParamFeild).then(function (dt) {
          setCurrentState(dt);
          def42.resolve(dt);
        });
        return def42.promise;

      }

      function isHibernate() {

        //console.log('is hibernate from gety.js');
        var def41 = $q.defer();

        appSql.select(tableFeild, gvar.defaultParamFeild2).then(function (h) {
          //console.log(h);
          if (h == '1') {
            def41.resolve(true);
          } else {
            def41.resolve(false);
          }
        });

        return def41.promise;
      }

      function isMap() {

        //console.log('is hibernate from gety.js');
        var gt1 = $q.defer();

        appSql.select(tableFeild, gvar.defaultParamFeild4).then(function (h) {
          //console.log(h);
          if (h == '1') {
            gt1.resolve(true);
          } else {
            gt1.resolve(false);
          }
        });

        return gt1.promise;
      }

      return {
        setReached : setReached,
        getReached : getReached,
        setParam3: setParam3,
        setParam4: setParam4,
        setParam5: setParam5,
        getParam3: getParam3,
        getParam4: getParam4,
        getParam5: getParam5,
        updateParam3: updateParam3,
        updateParam4: updateParam4,
        updateParam5: updateParam5,
        updateAll : updateAll,
        ping: ping,
        firstStart: firstStart,
        isFirstStart: isFirstStart,
        removeFirstStart: removeFirstStart,
        setCurrentState: setCurrentState,
        getCurrentState: getCurrentState,
        updateCurrentState: updateCurrentState,
        pullHibernate: pullHibernate,
        pushHibernate: pushHibernate,
        selectCurrentState: selectCurrentState,
        isHibernate: isHibernate,
        isMap : isMap
      };

    });


})();
