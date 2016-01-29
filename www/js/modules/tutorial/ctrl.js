(function () {

  'use strict';

  angular.module('starter.controllers').controller('TutCtrl',
    function ($state, $scope, toastr, cordova, help) {

      var vm = this;
      vm.showDone = false;
      var slideLimit = 3;

//cordova.init().then(function(r){
//
//},function(e){
//
//})

      vm.slideHasChanged = function (i) {
        //console.log(i);
        if (i == slideLimit) {
          vm.showDone = true;
        } else {
          vm.showDone = false;
        }
      }

      vm.pass = function(){
        $state.go('ui');
      }

      vm.ht = parseInt($('#htTargetBox').css('height')) + 5 + 'px';

      //console.log($('#htTargetBox').css('height'));
      //vm.ht = $document.height();

    });

})();
