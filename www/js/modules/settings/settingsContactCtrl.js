(function () {

  'use strict';

  angular.module('starter.controllers').controller('SettingsContactCtrl',

    function ($ionicLoading, $scope, $state, toastr, error, help) {

      var vm = this;

      vm.submit = function () {

        $ionicLoading.show();
        //toastr.success('submit');

        var param = {
          name : vm.form.name,
          email : vm.form.email,
          message : vm.form.msg
        };

        help.fetchPromise('contact-us',param).then(function(r){
          //try {
          //  navigator.notification.confirm(
          //    error.globalNetworkContentMessage, //  message
          //    function(buttonIndex) {
          $ionicLoading.hide();
                $state.go('tab.list');
                // console.log(GlobalVariables.globalNetworkContentMessage);
              //}, //  callback to invoke
              //error.globalSuccessHeading, //  title
              //error.globalSuccessButtonTitle //  button Name
            //);
          //} catch (e) {
          //  console.log(error.globalNetworkContentMessage);
          //  toastr.info(erro.globalNetworkContentMessage);
          //  $state.go('tab.list');
          //} finally {
          //  $state.go('tab.list');
          //  return false;
          //}

        },function(e){
          $ionicLoading.hide();
        });

      }

      //vm.form= {
      //  'name' : 'name',
      //    'email' : 'email',
      //    'msg' : 'msg'
      //}

    });

})();
