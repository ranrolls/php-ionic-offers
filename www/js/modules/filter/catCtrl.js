(function () {

  'use strict';

  angular.module('starter.controllers').controller('CatCtrl',

    function ($state, $scope, $timeout, toastr, gvar, cat) {

      var vm = this;

      $scope.selection = [];

      //if (gvar.development) toastr.info('catctrl');

      cat.getSqlSelection().then(function (c1) {
        //console.log(c1);
        $scope.selection = c1;
      });
      //$scope.selection = cat.getSelection();

      //$timeout(function () {
      //  $scope.selection = cat.getSelection();
      //  //console.log($scope.selection);
      //}, gvar.sqlValuePassDelay);

      //toastr.info('cat ctrl');

      $scope.cats = cat.getSampleCats;
      //toastr.info($scope.cats);

      $scope.passCats = function () {
        cat.setSelection($scope.selection);
        $scope.modal.remove();
        $state.go('tab.filter');
      }

      $scope.toggleSelection = function (Name) {
        var idx = $scope.selection.indexOf(Name);

        if (idx > -1) {
          $scope.selection.splice(idx, 1);
        }
        else {
          $scope.selection.push(Name);
        }
        //toastr.info($scope.selection);

        cat.setSqlSelection($scope.selection);
      };

    });

})();
