(function () {

  'use strict';

  angular.module('starter.controllers').controller('SettingsDetailCtrl', function ($scope, $state, toastr, item) {

    var vm = this;
    //vm.title = title;

    vm.data = item;

  });

})();
