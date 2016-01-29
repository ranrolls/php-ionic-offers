(function () {

  'use strict';

  angular.module('starter.controllers').controller('FilterCtrl', function ($state, $scope, $ionicModal, $timeout, $ionicLoading, toastr, gvar, filter, gety) {

    var vm = this;

    $scope.form = {};

    $ionicLoading.show();

    function init() {
      filter.getSqlArgs().then(function (r) {
        $scope.form.range = r;
        $scope.form.offerBy = filter.getOfferBy();
        $ionicLoading.hide();
      });
    };

    $scope.showList = function () {
      //if(gvar.development) toastr.success('show list');
      $ionicLoading.show();
      filter.setSqlArgs($scope.form.range, $scope.form.offerBy).then(function (t1) {
        //console.log(t1);
        $ionicLoading.hide();
        $state.go('tab.list');
      });
    };

    $scope.selectCategories = function () {
      try {
        $ionicModal.fromTemplateUrl('js/modules/filter/catogories.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function (modal) {
          $scope.modal = modal;
          modal.show();
        });
      } catch (e) {
        console.log(e);
      }
    };

    $scope.ping = function () {
      toastr.info('ping');
    };

    $scope.showLogin = function () {
      try {
        $ionicModal.fromTemplateUrl('js/modules/login/view.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function (modal) {
          $scope.modal = modal;
          modal.show();
        });
      } catch (e) {
        console.log(e);
      }
    };

    $scope.updateSqlOfferBy = function(by){
      //toastr.info('change in offer by ' + by);
      filter.updateOfferBy(by);
    }

    $scope.updateSqlRadius = function(){
      //toastr.info('change in radius ' + $scope.form.range);
      filter.updateRadius($scope.form.range);
    }


    $timeout(init, gvar.processWaiting);


  });





})();
