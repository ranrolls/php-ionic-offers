(function () {

  'use strict';

  angular.module('starter.controllers').controller('SearchStoreCtrl',
    function ($state, $scope, $ionicLoading, toastr, search, sDetail) {

      var vm = this;
      vm.type = 'offer';

      vm.currentItem = sDetail[0];

      vm.toggleType = function(type){
        vm.type = type;
      }
    });

})();
