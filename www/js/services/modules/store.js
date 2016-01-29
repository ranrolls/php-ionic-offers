(function () {

  'use strict';

  angular.module('service')

    .factory('store', function ($q, help, product) {

      self.currentStore = 0;

      function getCurrentStore() {
        return self.currentStore;
      }

      function setCurrentStore(cs) {
        self.currentStore = cs;
      }

      function getDetail(id) {
        var sto2 = $q.defer();

        var sd = [{
          name: 'store name',
          thumb: 'img/b/b1.png',
          img: 'img/sd/1.png',
          address: 'address',
          desc: 'desc',
          id: '11'
        }];

        sto2.resolve(sd);

        return sto2.promise;
      }

      function getProducts(id) {
        var sto3 = $q.defer();

        // get product by store id
        product.getList().then(function (l) {
          sto3.resolve(l);
        })

        return sto3.promise;
      }

      self.chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/ben.png'
      }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/max.png'
      }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/adam.jpg'
      }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/perry.png'
      }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
      }, {
        id: 5,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/max.png'
      }, {
        id: 6,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/adam.jpg'
      }, {
        id: 7,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/perry.png'
      }, {
        id: 8,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
      }, {
        id: 9,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/max.png'
      }, {
        id: 10,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/adam.jpg'
      }, {
        id: 11,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/perry.png'
      }, {
        id: 12,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
      }, {
        id: 13,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/max.png'
      }, {
        id: 14,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/adam.jpg'
      }, {
        id: 15,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/perry.png'
      }, {
        id: 16,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
      }];

      self.sampleSL = [{
        id: 1,
        name: 'name',
        address: 'address',
        thumb: 'img/b/b1.png',
        description: 'description'
      }, {
        id: 2,
        name: 'name',
        address: 'address',
        thumb: 'img/b/b2.png',
        description: 'description'
      }, {
        id: 3,
        name: 'name',
        address: 'address',
        thumb: 'img/b/b3.png',
        description: 'description'
      }, {
        id: 4,
        name: 'name',
        address: 'address',
        thumb: 'img/b/b4.png',
        description: 'description'
      }, {
        id: 5,
        name: 'name',
        address: 'address',
        thumb: 'img/b/b5.png',
        description: 'description'
      }, {
        id: 6,
        name: 'name',
        address: 'address',
        thumb: 'img/b/b6.png',
        description: 'description'
      }, {
        id: 7,
        name: 'name',
        address: 'address',
        thumb: 'img/b/b7.png',
        description: 'description'
      }, {
        id: 8,
        name: 'name',
        address: 'address',
        thumb: 'img/b/b8.png',
        description: 'description'
      }, {
        id: 9,
        name: 'name',
        address: 'address',
        thumb: 'img/b/b9.png',
        description: 'description'
      }, {
        id: 10,
        name: 'name',
        address: 'address',
        thumb: 'img/b/b10.png',
        description: 'description'
      }, {
        id: 11,
        name: 'name',
        address: 'address',
        thumb: 'img/b/b11.png',
        description: 'description'
      }, {
        id: 12,
        name: 'name',
        address: 'address',
        thumb: 'img/b/b12.png',
        description: 'description'
      }];

      function getList() {

        var sto1 = $q.defer();

        sto1.resolve(self.sampleSL);

        return sto1.promise;

      }

      return {
        getCurrentStore: getCurrentStore,
        setCurrentStore: setCurrentStore,
        getDetail: getDetail,
        getProducts: getProducts,
        getList: getList,
        all: function () {
          return chats;
        },

        sampleChats: chats,

        remove: function (chat) {
          chats.splice(chats.indexOf(chat), 1);
        },

        get: function (chatId) {
          for (var i = 0; i < chats.length; i++) {
            if (chats[i].id === parseInt(chatId)) {
              return chats[i];
            }
          }
          return null;
        }
      };
    });


})();
