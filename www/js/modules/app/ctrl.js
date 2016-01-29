(function () {
  'use strict';

  angular.module('starter.controllers').controller('AppCtrl', function () {

    var vm = this;

    vm.ping = function () {
      console.log('ping from login ctrl');
    }

    //angular.element('#tut').css('display','block');

    //$ionicConfigProvider.tabs.position("top");

  });

})();
