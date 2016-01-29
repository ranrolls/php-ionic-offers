(function () {

  'use strict';

  angular.module('service')

    .factory('product', function ($q, help) {

      function selectCat(cId){

        var pro3 = $q.defer();
        var csc = [];

        cId = parseInt(cId);

        if(cId == 1) csc = self.sampleDrinks;
        if(cId == 2) csc = self.sampleFoods;
        if(cId == 3) csc = self.sampleShoes;
        if(cId == 4) csc = self.sampleAccessories;

        if(csc.length < 2){
          csc = self.sampleDrinks;
        }

        pro3.resolve(csc);

        return pro3.promise;
      }

      function getDetail(c, sc,p){

        //console.log(' in product get detail service ');

        var pro2 = $q.defer();

        var csc = [];
        var cp = [];

        if(c == 1) csc = self.sampleDrinks;
        if(c == 2) csc = self.sampleFoods;
        if(c == 3) csc = self.sampleShoes;
        if(c == 4) csc = self.sampleAccessories;

        $.each(csc,function(k1,v1){
          if(v1.id == sc){
            //console.log(v1.id);
            $.each(v1.products, function(k2, v2){
              if(v2.id == p){
                //console.log(v2.id);
                cp = v2;
                pro2.resolve(cp);
                return false;
              }
            });
            return false;
          }
        });


        return pro2.promise;

      };

      function getSubCat(id){

        var param = {
          catid : id,
          latitude : '28.5165666',
          longitude : '77.2808931'
        }
        return help.fetchPromise('subCats',param);
      }

      function getList(scid) {
        var param = {
          subcatid : scid,
          latitude : '28.5165666',
          longitude : '77.2808931'
        }
        return help.fetchPromise('products', param);
      }

      function getAll(n){
        var param = {
          number : n
        }
        return help.fetchPromise('allOffers',param);
      }

      return {
        selectCat : selectCat,
        getDetail : getDetail,
        getSubCat : getSubCat,
        getList: getList,
        getAll : getAll
      };
    });


})();
