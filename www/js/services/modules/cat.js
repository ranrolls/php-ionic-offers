(function () {

  'use strict';

  angular.module('service')

    .factory('cat', function ($timeout, $q, toastr, gvar, appSql, catSql, help, cordova) {

      self.selection = [];

      self.count = 0;

      function getRootCats(){
        //var cat1 = $q.defer();
        return help.fetchPromise('rootCats');
      }

      function getSubCat(ci){

        var param = {
          catid : ci,
          latitude : cordova.getDLat(),
          longitude : cordova.getDLong()
        }

        return help.fetchPromise('subCats',param);

      }

      self.sampleCats = [{
        "id": 1,
        "name": "Drink Drink",
        "alias": "cat-1",
        "img" : "img/c/drink.png",
        "imgA" : "img/c/drink-active.png"
      }, {
        "id": 2,
        "name": "Food",
        "alias": "cat-2",
        "img" : "img/c/food.png",
        "imgA" : "img/c/food-active.png"
      }, {
        "id": 3,
        "name": "Shoes Shoes",
        "alias": "cat-3",
        "img" : "img/c/shoes.png",
        "imgA" : "img/c/shoes-active.png"
      },{
        "id": 4,
        "name": "Accessories",
        "alias": "cat-4",
        "img" : "img/c/accessories.png",
        "imgA" : "img/c/accessories-active.png"
      },{
        "id": 1,
        "name": "Drink Drink",
        "alias": "cat-1",
        "img" : "img/c/drink.png",
        "imgA" : "img/c/drink-active.png"
      }, {
        "id": 2,
        "name": "Food",
        "alias": "cat-2",
        "img" : "img/c/food.png",
        "imgA" : "img/c/food-active.png"
      }, {
        "id": 3,
        "name": "Shoes Shoes",
        "alias": "cat-3",
        "img" : "img/c/shoes.png",
        "imgA" : "img/c/shoes-active.png"
      },{
        "id": 4,
        "name": "Accessories",
        "alias": "cat-4",
        "img" : "img/c/accessories.png",
        "imgA" : "img/c/accessories-active.png"
      },{
        "id": 1,
        "name": "Drink Drink",
        "alias": "cat-1",
        "img" : "img/c/drink.png",
        "imgA" : "img/c/drink-active.png"
      }, {
        "id": 2,
        "name": "Food",
        "alias": "cat-2",
        "img" : "img/c/food.png",
        "imgA" : "img/c/food-active.png"
      }, {
        "id": 3,
        "name": "Shoes Shoes",
        "alias": "cat-3",
        "img" : "img/c/shoes.png",
        "imgA" : "img/c/shoes-active.png"
      },{
        "id": 4,
        "name": "Accessories",
        "alias": "cat-4",
        "img" : "img/c/accessories.png",
        "imgA" : "img/c/accessories-active.png"
      }];

      function setSqlSelection(selection) {
        //console.log(selection);
        //self.selection = selection;
        var s, i = 0, v = 'c', f = '', ex = 0, l = selection.length;
        self.count = l;
        for (s in selection) {

          ex = i + 1;
          f = v + ex.toString();

          //console.log(f, selection[i]);
          catSql.update(f, selection[i]);


          //self.count++;
          //console.log(l);
          if (ex == l) appSql.update('filter', 'p3', l.toString());
          if (i > 24) break;
          i++;

        }
      }

      function setSelection(selection) {
        //toastr.info('setSelection from cat service');
        self.selection = selection;
      }

      function getSqlSelection() {

        var i = 0;
        var s, i = 0, v = 'c', f = '', ex = 0, cd1 = $q.defer();

        var tmpSelection = [];
        //self.selection = [];
        var rnd = new Date().getTime();
        catSql.select('filter', 'p3', rnd).then(function (c1) {
          var count = parseInt(c1);
          if (count > 0) {
            //toastr.info(count);
            self.count = count;
            catSql.selects().then(function (c2) {
              //console.log(c2);
              for (i = 0; i < count; i++) {
                ex = i + 1;
                tmpSelection.push(c2['c' + ex.toString()]);
                if (i == count - 1) setSelection(tmpSelection);
              }
              cd1.resolve(tmpSelection);

            });
            //
            //$timeout(function () {
            //
            //  self.count = parseInt(catSql.getVariable());
            //  //self.count = catSql.getVariable();
            //  //console.log(self.count);
            //
            //  var rs = catSql.getResultSet();
            //  //console.log(rs);

            //
            //}, gvar.sqlValuePassDelay);

          }
        });
        return cd1.promise;

      }

      function getSelection() {
        return self.selection;
      }

      return {
        count: count,
        getRootCats : getRootCats,
        getSubCat : getSubCat,
        getSampleCats: sampleCats,
        setSelection: setSelection,
        getSelection: getSelection,
        setSqlSelection: setSqlSelection,
        getSqlSelection: getSqlSelection
      };
    });


})();
