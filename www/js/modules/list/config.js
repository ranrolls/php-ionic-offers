(function () {

  'use strict';

  angular.module('starter')
    .config(function ($stateProvider) {
      $stateProvider
        .state('tab.list', {
          url: '/list',
          views: {
            'tab-list': {
              templateUrl: 'js/modules/list/tab-list.html',
              controller: 'ListCtrl as lc',
              resolve: {
                setState: setState,
                ask : ask
              }
            }
          }
        })
        .state('tab.detail', {
          url: '/detail/:id',
          views: {
            'tab-list': {
              //templateUrl: 'js/modules/list/detail.html',
              //controller: 'DetailCtrl as dc',
              templateUrl: 'js/modules/search/offer.html',
              controller: 'SearchOfferCtrl as soc',
              resolve: {
                oDetail: oDetail,
                //setState: setState,
                //checkReached : checkReached,
                ask : ask
              }
            }
          }
        });
    });

  function oDetail($stateParams, search) {
    //console.log($stateParams.id);
    return search.fetchOfferDetail($stateParams.id).then(function(od){
      //console.log(od);
      return od.result;
    });
  }

  function ask(cordova){
    //cordova.beforeListCheck();
    cordova.ask();
  }

  //function checkReached(toastr, gvar, gety){
  function checkReached(gety){
    //if(!gety.getReached()){
    //}
  }

  function setState(toastr, gvar, gety) {
  //function setState(gety) {
  //  if (gvar.development) toastr.success('updated sql current state');
  //  gety.updateCurrentState('tab.list').then(function (cs) {
  //    gety.pushHibernate().then(function (h) {
  //
  //    })
  //  });
    return null;
  }

})();
