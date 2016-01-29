(function () {

  'use strict';

  angular.module('service')

    .factory('search', function ($q, help) {

      function fetchOfferDetail(oid) {
        var param = {
          offerID : oid
        };
        return help.fetchPromise('offer',param);
      }

      function fetchStoreDetail(id) {
        var sr3 = $q.defer();

        sr3.resolve(self.sampleStoreDetail);

        return sr3.promise;
      }

      function getList() {
        var sr1 = $q.defer();

        sr1.resolve(self.sampleSearchList);

        return sr1.promise;
      }

      self.sampleStoreDetail = [{
        "id": 1,
        "name":"ChaoBella - Crow.......",
        "industry":"Restaurant",
        "shortDesc":"Okhla Phase 1, NCR",
        "imgA":"img/sd/food/drink-active.png",
        "offers":[],
        "folowers":[],
        "stores":[{
          "id":1,
          "shortDes":"Okhla Phase 1",
          "distance":"1.5 kms away",
          "phone":"9810129455",
          "lat":"28.5223359",
          "long":"77.28489719999993"
        }]
      }];

      self.sampleOfferDetail = [{
        "id":1,
        "name":"The Wine Company",
        "img":"img/p/food/1.jpg",
        "imgA":"img/p/food/1.jpg",
        "shortDesc":"Happy Hours - 4:30pm - 6:30pm",
        "lTime":"4:30pm - 6:30pm (Monday - Saturday)",
        "whatsp":"",
        "rating":3,
        "fav":1,
        "disc":"20%",
        "offerDet":"Happy Hours:12:30pm-3:00pm & 7:00pm-11:00pm (Monday-Sunday) Buy 1 Get 1 free",
        "nearbyStore":"Cyber Hub,DLF Cyber City, Gurgaon DLF Cyber City",
        "dist":"7.0 kms",
        "lat":"28.4962466",
        "long":"77.08877389999998",
        "mapImg":"img/p/maps/1.jpg",
        "phone":"+911204216288",
        "ratingOffer":"5",
        "tac":[{"val":"No cash value unless otherwise indicated in these terms."},
          {"val":"ONM does not make any waranty in relation to the offers."},
          {"val":"ONM is not party to any transaction that the advertiser and user may enter into"}]
      }];

      self.sampleSearchList = [{
        "id": 1,
        "name":"ChaoBella - Crowne Plaza",
        "shortDesc":"Okhla Phase 1",
        "type":"Store"
      }, {
        "id": 2,
        "name": "Deli Belly",
        "shortDesc": "Jasola",
        "type":"Store"
      }, {
        "id": 3,
        "name":"Wine & Beer",
        "shortDesc":"Living Style Mall - Jasola",
        "type":"Store"
      },{
        "id": 4,
        "name": "Happy Hours - 4:30pm - 6pm",
        "shortDesc": "The Wine Company",
        "type":"Offer"
      },{
        "id":5,
        "name":"Happy Hours -(Monday-Saturday)",
        "shortDesc":"Capital - The Ashok",
        "type": "Offer"
      },{
        "id":6,
        "name":"Happy Hours -12:00pm - 9:00am",
        "shortDesc":"In The Punjab",
        "type":"Offer"
      },{
        "id":7,
        "name":"Happy Hours -3:00pm - 8:00am",
        "shortDesc":"Lions of Punjab",
        "type":"Offer"
      }];

      return {
        fetchOfferDetail: fetchOfferDetail,
        fetchStoreDetail: fetchStoreDetail,
        getList: getList,
        getSampleList: sampleSearchList
      };

    });


})();
