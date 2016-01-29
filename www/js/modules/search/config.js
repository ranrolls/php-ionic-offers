(function () {

  'use strict';

  angular.module('starter.controllers')
    .config(function ($stateProvider) {

      $stateProvider

        .state('tab.search', {
          url: '/search',
          views: {
            'tab-search': {
              templateUrl: 'js/modules/search/view.html',
              controller: 'SearchCtrl as sc',
              resolve: {
                //setState: setState,
                //checkReached : checkReached,
                //ask : ask
              }
            }
          }
        })
        .state('tab.searchOfferDetail', {
          url: '/searchOfferDetail/:id',
          views: {
            'tab-search': {
              templateUrl: 'js/modules/search/offer.html',
              controller: 'SearchOfferCtrl as soc',
              resolve: {
                oDetail: oDetail
                //setState: setState,
                //checkReached : checkReached,
                //ask : ask
              }
            }
          }
        })
        .state('tab.searchStoreDetail', {
          url: '/searchStoreDetail/:id',
          views: {
            'tab-search': {
              templateUrl: 'js/modules/search/store.html',
              controller: 'SearchStoreCtrl as ssc',
              resolve: {
                sDetail: sDetail
                //setState: setState,
                //checkReached : checkReached,
                //ask : ask
              }
            }
          }
        });
    });

  function oDetail($stateParams, search) {
    console.log($stateParams.id);
    return search.fetchOfferDetail($stateParams.id);
  }

  function sDetail($stateParams, search) {
    console.log($stateParams.id);
    return search.fetchStoreDetail($stateParams.id);
  }

})();
