(function () {

  'use strict';

  angular.module('starter.controllers').controller('SearchCtrl',
    function ($state, $scope, $ionicLoading, toastr, search) {

      var vm = this;

      //vm.key = "";  vm.showRes = false;
      vm.key = "wine";   vm.showRes = true;

      vm.results = search.getSampleList;

      //$state.go('tab.searchStoreDetail',{id : 1});
      //$state.go('tab.searchOfferDetail',{id : 1});

      vm.change = function () {
        $ionicLoading.show();
        vm.showRes = (vm.key.length > 1) ? true : false;
        //console.log('value for key = ' + vm.key);
        $ionicLoading.hide();

      }

      vm.detail = function (el) {
        //console.log(el);

        if(el.type == "Store"){
          $state.go('tab.searchStoreDetail',{id : el.id});
        }else{
          $state.go('tab.searchOfferDetail',{id : el.id});
        }

      }


    });

})();
