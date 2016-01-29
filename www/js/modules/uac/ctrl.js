(function () {

  'use strict';

  angular.module('starter.controllers').controller('UacCtrl',
    function ($state, $scope, $timeout, $ionicModal, toastr, gvar, user) {

    var vm = this;

    $scope.us = false;

    $scope.$on('$stateChangeSuccess', function (toState) {

      vm.currentState = $state.current.name;
      if (vm.currentState == 'tab.uac') {
        init();
      }

    });

    //$scope.$on('us',function(newValue, oldValue){
    //  console.log(newValue);
    //  console.log(oldValue);
    //})

    function init() {

      user.getSqlLogin().then(function (l) {
        //console.log(l);
        if (l == 1) {
          $scope.us = true;
          // fetch user fresh information and pass to view
          //toastr.success('fetching new user information');


          //$timeout(function(){
          //  console.log('timeout worked');
          //  user.setSqlLogin(0).then(function () {
          //    $state.go('tab.settings');
          //  });
          //},3000);


        } else {
          $scope.us = false;
          $ionicModal.fromTemplateUrl('js/modules/login/view.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function (modal) {
            $scope.modal = modal;
            modal.show();
          });
        }
      });

    }

    vm.logout = function(){

      //console.log('user logout');

      var us = 0;

      user.getSqlLogin().then(function (sl) {
        if (sl == 1) {
          user.setSqlLogin(0).then(function (o) {
            us = 0;
            $state.go('tab.list');
            //$state.go('tab.settings');
            //if (gvar.development) toastr.error('user logout');
            //$scope.modal.remove();
          })
        }else{
          //toastr.error(sl);
        }

      });

    }

  });

})();
