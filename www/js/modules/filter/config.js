(function () {

  'use strict';

  angular.module('starter')
    .config(function ($stateProvider) {

      $stateProvider

        .state('tab.filter', {
          url: '/filter',
          views: {
            'tab-filter': {
              templateUrl: 'js/modules/filter/tab-filter.html',
              controller: 'FilterCtrl',
              resolve: {

                setState: setState,
                clearListDetail: clearListDetail

              }
            }
          }
        });
    });

  function setState(gety) {
    //console.log('setState from filter->config');
    gety.isFirstStart().then(function (f) {
      //console.log(f);
      if (!f) {
        gety.updateCurrentState('tab.filter').then(function (cs) {
          gety.pushHibernate().then(function (h) {
            //console.log(h);
            //console.log('gety.pullhibernate from setState of filter->config');
          });
        });
      }else{

      }
    });
    return null;
  }


  function clearListDetail(gety) {
    gety.updateParam3(0).then(function () {
      //console.log('clear list detail from filter config');
    });
  }

})();
