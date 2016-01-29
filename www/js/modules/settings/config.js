(function () {

  'use strict';

  angular.module('starter')
    .config(function ($stateProvider) {

      $stateProvider

        .state('tab.settings', {
          url: '/settings',
          views: {
            'tab-settings': {
              templateUrl: 'js/modules/settings/tab-settings.html',
              controller: 'SettingsCtrl as sc'
            }
          }
        })
        .state('tab.settingsdetail', {
          url: '/settingsDetail/:alias',
          views: {
            'tab-settings': {
              templateUrl: 'js/modules/settings/detail.html',
              controller: 'SettingsDetailCtrl as sdc',
              resolve: {
                ask: ask,
                item: item
              }
            }
          }
        })
        .state('tab.settingscontact', {
          url: '/settingsContact',
          views: {
            'tab-settings': {
              templateUrl: 'js/modules/settings/contact.html',
              controller: 'SettingsContactCtrl as scc',
            }
          }
        });
    });

  function ask(cordova) {
    //cordova.beforeListCheck();
    cordova.ask();
  }

  function item($stateParams, help) {
    //console.log($stateParams.alias);
    var param = {
      alias : $stateParams.alias
    }
    return help.fetchPromise('settingsDetail', param).then(function(rs){
      //console.log(rs);
      return rs;
    });
  }

  function title($stateParams) {
    //console.log($stateParams.title);
      return $stateParams.title;
  }

})();
