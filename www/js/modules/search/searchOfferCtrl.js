(function () {

  'use strict';

  angular.module('starter.controllers').controller('SearchOfferCtrl',
    function ($cordovaDialogs, $state, $scope, $ionicLoading, $ionicModal, toastr, search, oDetail, error) {

      var vm = this;

      vm.c = oDetail[0];

      vm.map = function (lt, lng) {

        if(lt.length < 2){
          if (!ionic.Platform.isWebView()) {
            $cordovaDialogs.alert(error.noLocationProvided, error.globalErrorHeading, error.globalErrorButtonTitle)
              .then(function () {
                return false;
              });
          }else{
            toastr.error(error.noLocationProvided);
            return false;
          }
          return false;
        }else {

          //toastr.info('given lt ' + lt);
          //toastr.info('given lng ' + lng);
          $scope.lt = parseFloat(lt);
          $scope.lng = parseFloat(lng);
          //$state.go('tab.map');
          $ionicModal.fromTemplateUrl('js/modules/map/view.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function (modal) {
            $scope.modal = modal;
            modal.show();
          });
        }
      }

      vm.social = function () {
        //toastr.success('social');
      }

      vm.share = function () {
        //toastr.success('share');
      }

      vm.toggleFav = function () {
        //toastr.success('toggleFav');
      }


    });

})();
