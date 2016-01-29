(function () {

  'use strict';

  angular.module('starter.controllers').controller('SettingsCtrl', function ($scope, $ionicModal, toastr, help) {

    var vm = this, us = false;

    $scope.settings = {
      login: false,
      version: '0.0.1'
    };

    help.fetchPromise('settingsMenu').then(function(rs){
      //console.log(rs);
      vm.list = rs;
    });



    //
    //user.getSqlLogin().then(function (l) {
    //  console.log(l);
    //  if (l == 1) {
    //    //$scope.$apply(function(){
    //      $scope.settings.login = true;
    //    us = true;
    //    //});
    //  } else {
    //    //$scope.$apply(function(){
    //      $scope.settings.login = false;
    //    us = false;
    //    //});
    //  }
    //});

    //$scope.login = function () {
    //  try {
    //    //$scope.settings.login = false;
    //    $ionicModal.fromTemplateUrl('js/modules/login/view.html', {
    //      scope: $scope,
    //      animation: 'slide-in-up'
    //    }).then(function (modal) {
    //      //console.log(modal);
    //      $scope.modal = modal;
    //      //$scope.c1 = true;
    //      modal.show();
    //    });
    //  } catch (e) {
    //    console.log(e);
    //  }
    //}

    //$scope.userLogin = function () {
    //  toastr.info('change in login');
    //  //toastr.info('$scope.settings.login before if found ' + $scope.settings.login);
    //  toastr.info('us before if found ' + us);
    //  if (us == false) {
    //    toastr.info('$scope.settings.login  found ' + $scope.settings.login);
    //    toastr.info('opening login modal');
    //    //loginStatus = false;
    //    //$scope.settings.login = false;
    //    try {
    //      //$scope.settings.login = false;
    //      $ionicModal.fromTemplateUrl('js/modules/login/view.html', {
    //        scope: $scope,
    //        animation: 'slide-in-up'
    //      }).then(function (modal) {
    //        //console.log(modal);
    //        $scope.modal = modal;
    //        //$scope.c1 = true;
    //        modal.show();
    //      });
    //    } catch (e) {
    //      console.log(e);
    //    }
    //  } else {
    //    toastr.info('$scope.settings.login found ' + $scope.settings.login);
    //    toastr.info('user logout');
    //    user.logout().then(function (dt) {
    //      //$rootScope.$broadcast('loginStatus', {
    //      //  'status': 0
    //      //});
    //      //loginStatus = false;
    //
    //      $scope.$apply(function(){
    //        $scope.settings.login = false;
    //        us = false;
    //
    //      });
    //      $rootScope.$broadcast('loginStatus', {
    //        'status': 0
    //      });
    //    });
    //  }
    //}

    //$scope.$on('loginStatus', function (event, args) {
    //  console.log('in settingsCtrl catched broadcast');
    //  var status = args.status;
    //  //            console.log(args);if
    //  if (status == 1) {
    //    //                console.log('user login');
    //    //us = true;
    //    $scope.$apply(function(){
    //      $scope.settings.login = true;
    //      us = true;
    //    });
    //
    //  } else if (status == 0) {
    //    //                console.log('user logout');
    //    //us = false;
    //    $scope.$apply(function(){
    //      $scope.settings.login = false;
    //      us = false;
    //    });
    //  }
    //  ;
    //  //            console.log(' vm. us change to = ' + vm.us);
    //});

  })
  ;

})();
