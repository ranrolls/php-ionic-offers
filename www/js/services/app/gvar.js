(function () {

  'use strict';

  angular.module('service')

    .factory('gvar', function () {

      self.development = false;
      self.fastDev = false;
      self.appVersion = '0.0.1';

      self.wait10 = 10000;
      self.wait5 = 5000;
      self.wait4 = 4000;
      self.wait3 = 3000;
      self.wait2 = 2000;
      self.wait1 = 1000;
      self.processWaiting = 1000;
      self.sqlValuePassDelay = 100;

      self.domain = 'http://onm.socialcircle.marketing/webservice/';

      self.defaultInitialState = 'tab.filter';
      self.defaultParamFeild = 'p1';
      self.defaultParamFeild2 = 'p2';
      self.defaultParamFeild3 = 'p3';
      self.defaultParamFeild4 = 'p4';
      self.defaultParamFeild5 = 'p5';

      return {
        development : development,
        fastDev : fastDev,
        appVersion : appVersion,
        wait5 : wait5,
        wait4 : wait4,
        wait3 : wait3,
        wait2 : wait2,
        wait1 : wait1,
        processWaiting : processWaiting,
        sqlValuePassDelay : sqlValuePassDelay,
        domain : domain,
        defaultInitialState : defaultInitialState,
        defaultParamFeild : defaultParamFeild,
        defaultParamFeild2 : defaultParamFeild2,
        defaultParamFeild3 : defaultParamFeild3,
        defaultParamFeild4 : defaultParamFeild4,
        defaultParamFeild5 : defaultParamFeild5
      };
    });


})();
