(function () {

  'use strict';

  angular.module('starter.controllers').controller('ListCtrl',
    function ($scope, $state, $timeout, $cordovaDialogs, $cordovaInAppBrowser,
              $ionicModal, $ionicLoading, $ionicScrollDelegate, $ionicHistory, toastr,
              gvar, gety, cat, store, product, pushP) {

      //angular.element(document).find('#listSearchToggle').addClass('hidden');
      //var k = angular.element(document).find('listSearchToggle').html();
      //
      //console.log(k);

      //angular.element('.searchListButtonIcon').on('click', function(){ // do something
      //  console.log('click catched');
      //});
      var listToggle = false;

      function openSearchKeyBox(el){
        $(el).animate({
          right: "1px"
        }, 1000, function() {
          // Animation complete.
          $("#searchkeyText").focus(function() {
            //alert( "Handler for .focus() called." );
          });
        });
      }

      function closeSearchKeybox(el){
        $(el).animate({
          right: "-160px"
        }, 1000, function() {
          $(el).blur();
        });
      }

      //$('#listSearchToggle').click(function(){
      //
      //  if(listToggle){
      //    closeSearchKeybox(this);
      //  }else{
      //
      //    openSearchKeyBox(this);
      //  }
      //
      //  listToggle = !listToggle;
      //});

      var vm = this;
      vm.showExOffer = true;
      var dev = gvar.fastDev;
      var pass = true, passUrl = 'tab.search';
      vm.cats = [], vm.subCats = [];
      vm.allItems = [];
      vm.all = true;
      var allPageNo = 1;
      var push;
      $scope.sid = "10903921359";
      var allPageLimit = 9;
      var notificationId = 9999;
      var allFetch = true;
      var currentSc = 0;
      var fillSubCat = true;
      var fillSubCatLimit = 9;
      vm.tut = true;
      vm.noSubCat = false;
      vm.emptySubCats = false;
      var prevCat = [];
      var hc = 0;
      var firstEntry = true;
      var catWidthReset = false;
      vm.navWidth = 5000;
      pass = false;
      vm.all = false;

      function sendAppVersion() {
        //toastr.success('send app version');
        pushP.sendAppVersion('0.0.1', device.uuid).then(function (obj) {
          // success obj

          //toastr.success(obj.status);

          if (obj.status == 2) {
            //toastr.info(obj.result);
            //alert(obj.result);

            var page = obj.result;
            page = 'http://www.google.com';

            $ionicLoading.show();
            var target = '_self';
            var options = {
              location: 'yes',
              clearcache: 'yes',
              closebuttoncaption: 'Close',
              toolbar: 'yes'
            };
            // console.log('sending anchor to inappbrowser');
            try {

              target = (ionic.Platform.isIOS()) ? '_blank' : '_self';
              options.location = (ionic.Platform.isIOS()) ? 'no' : 'yes';
              options.toolbar = (ionic.Platform.isIOS()) ? 'yes' : 'no';
              //event.preventDefault();
              $cordovaInAppBrowser.open(obj.result, target, options)
                .then(function (event) {
                  $ionicLoading.hide();
                })
                .catch(function (event) {
                  $ionicLoading.hide();
                });

            } catch (e) {
              toastr.error('fail try');
            }
          }

        }, function () {
          //error
        });
      }

      vm.pushScItems = function () {
        //console.log('push sc items');
      }

      function newDevicePush(rid) {

        //toastr.success( rid + ' new Device Push func of list ctrl')

        //cordova.init().then(function(){

        //var model = $cordovaDevice.getModel();
        //var platform = $cordovaDevice.getPlatform();
        var uuid = device.uuid;
        //var version = $cordovaDevice.getVersion();

        var par = {
          deviceid: uuid,
          devicetoken: rid,
          //deviceplatform: platform,
          //devicemodel: model,
          //deviceversion: version
        };

        pushP.registerNewDevice(par);

        //},function(){
        //  toastr.error('cordova init failed');
        //})

      }

      function preparePush() {

        try {
          if (PushNotification && (device.platform == 'android' || device.platform == 'Android')) {
            push = PushNotification.init({
              "android": {
                "senderID": $scope.sid
              }
            });
            push.on('registration', function (data) {

              //try {
              //  $cordovaDialogs.alert('Registration id is ' + data.registrationId, 'ONM', 'Retry Now!')
              //    .then(function () {
              //    });
              //} catch (e3) {
              //}

              //pushP.checkPush().then(function(dt) {
              //   toastr.info(dt + ' prepare push func of list ctrl');
              //  if (dt.status == 1) {
              //     toastr.info('device already available ' + ' prepare push func of list ctrl');
              // return false;
              newDevicePush(data.registrationId);
              //  } else if (dt.status == 0) {
              //    newDevicePush(data.registrationId);
              //     toastr.info('new device from ctrl ' + ' prepare push func of list ctrl');
              //  }
              //})
            });
            push.on('notification', function (data) {
              var msg = data.message;
              var title = data.title;

              notificationId++;

              cordova.plugins.notification.local.schedule({
                id: notificationId,
                title: title,
                text: msg
              });

            });
            push.on('error', function (e) {
              toastr.error('e.message = ');
              toastr.error(e.message);
            });
          }
        } catch (err) {
          if (ionic.Platform.isAndroid()) {
            toastr.error('error 1');
            toastr.error("Error = " + err.message);
          }
          $ionicLoading.hide();
        }

      }

      function fillSubCatProducts() {
        $ionicLoading.show();
        allFetch = false;
        //console.log('fill sub cat products');
        if (!fillSubCat) {
          //console.log('filling Sub cats start');
          fillSubCat = true;
          $ionicLoading.show();
          fillSubCatLimit = vm.subCats.length;
          fillSubCatProducts();
        } else {
          //console.log('incomming fillSubCatLimit = ' + fillSubCatLimit);
          //console.log('incomming currentSc = ' + currentSc);

          if (fillSubCatLimit > 0 && currentSc < fillSubCatLimit) {
            var scid = vm.subCats[currentSc].subcatid;
            //console.log(vm.subCats[0].subcatid);
            product.getList(scid).then(function (p) {
              if (p.status > 0) {
                vm.subCats[currentSc].pLimit = p.num_pages;
                vm.subCats[currentSc].products = p.result;
                vm.emptySubCats = false;

                //$timeout(function(){
                handleScroll('h' + currentSc);
                //}, gvar.wait2);

              } else {
                if (currentSc == 0 && p.status == 0) {
                  vm.emptySubCats = true;
                }
                vm.subCats[currentSc].noProducts = true;
              }
              //console.log(p);
              currentSc++;
              fillSubCatProducts();
            }, function () {

            });
          } else {
            //if(currentSc == fillSubCatLimit){
            $timeout(function () {
              $ionicLoading.hide();
            }, gvar.wait5);
            //}
            currentSc = 0;
            //$ionicLoading.hide();
          }
        }
        //fillSubCatLimit
      }

      $scope.toggleSearch = function () {

        try {
          $ionicModal.fromTemplateUrl('js/modules/list/search.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function (modal) {
            $scope.modal = modal;
            modal.show();
          });
        } catch (e) {
          console.log(e);
        }

      };

      vm.detail = function (scId, pId) {

        $ionicLoading.show();
        //if (gvar.development) toastr.info('incomming cid = ' + prevCat.id + ' scId is ' + scId + ' pId is ' + pId);
        //if (gvar.development) toastr.info('incomming scId is ' + scId + ' pId is ' + pId);

        //gety.updateAll(prevCat.id, scId, pId).then(function (c) {

        $ionicLoading.hide();
        $state.go('tab.detail', {id: pId});

        //});

      }

      $scope.ping = function () {
        toastr.info('ping');
      }

      function pass() {

        gety.getParam3().then(function (li) {

          if (li > 0) {
            if (!gety.getReached()) {
              $ionicLoading.hide();
              $scope.detail(li);
            } else {
              gety.updateParam3(0);
            }
          } else {
            //$('.navBtn').each(function(){
            //  toastr.success($(this).width());
            //});
          }
        });
      }

      vm.resetWidth = function () {
        //console.log('reset width');
        //toastr.success('reset width');
        vm.navWidth = 0;
        catWidthReset = true;
        $('.navBtn').each(function (index, value) {
          //toastr.success(parseInt($(this).css('width').substring(0, 3)));
          vm.navWidth += parseInt($(this).css('width').substring(0, 3));
          vm.navWidth += 1;
          //
          //toastr.info(vm.navWidth);
        });
        //toastr.info(vm.navWidth);
      }

      vm.resetCatWidth = function () {
        if (!catWidthReset) vm.resetWidth();
      }

      vm.selectedCat = function (cat) {

        $ionicLoading.show();

        allFetch = false;
        fillSubCat = false;

        vm.noSubCat = false;

        prevCat.active = false;

        $.each(vm.cats, function (k1, v1) {
          v1.active = false;
        });

        if (cat != -1) {

          allFetch = false;
          prevCat = cat;
          prevCat.active = true;
          vm.items = [];

          hc = 0;

          var id = parseInt(cat.catid);
          //console.log(id);
          product.getSubCat(id).then(function (sc) {
            //console.log(sc);
            var scl = sc.result.length;
            if (scl > 0) {

              vm.noSubCat = false;
              vm.subCats = sc.result;
              //console.log(vm.subCats);

              fillSubCatLimit = scl;
              //console.log('fill sub cat limit = ' + fillSubCatLimit);

              $timeout(function () {
                fillSubCatProducts();
              }, gvar.wait2);

            } else {
              $ionicLoading.hide();
              fillSubCatLimit = 0;
              vm.noSubCat = true;
            }

          })

          //if (id == 1) {
          //  //$scope.$apply(function () {
          //  vm.items = product.getSampleDrinks;
          //  //$ionicLoading.show();
          //  handleScroll(vm.items.length);
          //  //});
          //} else if (id == 2) {
          //  //$scope.$apply(function () {
          //  vm.items = product.getSampleFoods;
          //  //$ionicLoading.show();
          //  handleScroll(vm.items.length);
          //  //});
          //}
          //else if (id == 3) {
          //  //$scope.$apply(function () {
          //  vm.items = product.getSampleShoes;
          //  //$ionicLoading.show();
          //  handleScroll(vm.items.length);
          //  //});
          //}
          //else if (id == 4) {
          //  //$scope.$apply(function () {
          //  vm.items = product.getSampleAccessories;
          //  //$ionicLoading.show();
          //  handleScroll(vm.items.length);
          //  //});
          //}
          vm.all = false;

        } else {
          vm.all = true;
          allFetch = true;
          //if (allFetch && allPageNo != allPageLimit) {
          getAllItems();
          //}
          //vm.items = product.getSampleAccessories[0].products;

          //handleAllScroll();
        }

        //if (gvar.development) toastr.info('selected cat id is ' + cat.id);
      }

      function getAllItems() {
        //toastr.success('left swipe catch');
        if (allFetch == false) {
          $ionicLoading.hide();
          return false;
        }

        product.getAll(allPageNo).then(function (al) {
          if (al.status == 1) {

            vm.all = true;
            //console.log(al);
            if (allPageNo == 1) {
              vm.allItems = al.result;
            } else {
              $(al.result).each(function (k1, v1) {
                vm.allItems.push(v1);
              });
            }

            allPageLimit = al.num_pages;

            if (allPageNo == allPageLimit || allPageNo > allPageLimit) {
              allFetch = false;
            } else {
              allFetch = true;
              allPageNo++;

              //if(dev){
              //  $state.go('tab.detail', {id: 1});
              //}

            }
            $timeout(function () {
              if (allFetch == false) {
                handleAllScroll();
                //$ionicLoading.hide();
                return false;
              }
              getAllItems();
            }, gvar.wait5);

            $ionicLoading.hide();
          } else {
            toastr.error('no offers in all category');
          }
        });
      }

      function init() {

        //toastr.success('init');
        $('#listSearchToggle').show();
        //vm.type = filter.getOfferBy();
        //if (gvar.development) toastr.info('List Ctrl -> Init func');
        $scope.title = '<img src="img/ui-assets/logo.gif" class="logo">';
        if (firstEntry) {

         // keep loading on
          $ionicLoading.show();
          $ionicHistory.clearHistory();
          //if (gvar.development) toastr.info('first entry');
          // get all root cats
          cat.getRootCats().then(function (dt) {
            //toastr.success(dt);
            //console.log(dt);

            if (dt.status == 1) {
              vm.cats = dt.result;
              //console.log(vm.cats);
              // fla awards
              // trust motoring
              getAllItems();
              if (!ionic.Platform.isWebView()) {
                preparePush();
//toastr.info('calling send app version');
                sendAppVersion();
              }
            }
            //toastr.success(vm.cats);
          }, function (er) {
            toastr.error(er.message);
          });

          // get all featured offer list in pagination
          // put firstEntry to false
          firstEntry = false;
          //vm.cats = cat.getSampleCats;

        } else {

          vm.showExOffer = false;
          //listToggle = true;
          //closeSearchKeybox($('#listSearchToggle'));

          // get subcats and product for specific selected category
          getAllItems();
          //var sc = dt.result[dt.result.length - 1].catid;
          //toastr.success(sc);
          //cat.getSubCat(sc).then(function(dt1){
          //  //toastr.success(dt1);
          //  if(dt.status == 1){
          //    vm.subCats = dt1.result;
          //    $(vm.subCats).each(function(k1, v1){
          //      console.log(v1);
          //
          //      product.getList(v1.subcatid).then(function(p){
          //        v1.products = p;
          //      })
          //
          //    })
          //  }
          //},function(er){
          //  toastr.error(er.message);
          //})
        }
        //if (gvar.development) toastr.info(vm.cats);

        //gety.getParam3().then(function (c) {

        //console.log('sending c = ' + c + ' sc =  ' + sc + ' p = ' + p + ' to get product detail ');
        //product.selectCat(c).then(function (cd) {
        //  vm.items = cd;
        //
        //  if(prevCat.length < 2){
        //    prevCat = vm.cats[0];
        //    prevCat.active = true;
        //  }else{
        //    vm.selectedCat(prevCat);
        //vm.selectedCat(-1);
        //prevCat.active = true;
        //  }
        //
        if (pass) $state.go(passUrl);
        //
        //});
        //});
      }

      //vm.items = product.getSampleDrinks;
      init();

      $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        vm.currentState = $state.current.name;
        //console.log(fromState);
        if(fromState.name == 'tab.list'){
          $('#listSearchToggle').hide();
        }
        if (vm.currentState == 'tab.list') {
          init();
        }
      });

      var handle = $ionicScrollDelegate.$getByHandle('mainScroll');

      vm.onSwipeUp = function () {
        //if(gvar.development) toastr.info('swipe up event catch');
        //$ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom(true);
        handle.scrollBottom(true);
      }

      vm.onSwipeDown = function () {
        //if(gvar.development) toastr.info('swipe down event catch');
        //$ionicScrollDelegate.$getByHandle('mainScroll').scrollTop(true);
        handle.scrollTop(true);
      }

      //$scope.handle = $ionicScrollDelegate.$getByHandle('mainScroll');

      vm.onDrag = function (e) {
        var distance = -1 * e.gesture.deltaY;
        //$scope.handle.scrollBy(0,distance,true);
        handle.scrollBy(0, distance, true);
      }

/////////   vertical ion-scroll fix   //////////////

      var handleAllScroll = function () {
        //return false; // <--- comment this to "fix" the problem
        var sv = $ionicScrollDelegate.$getByHandle('all').getScrollView();

        var container = sv.__container;

        var originaltouchStart = sv.touchStart;
        var originalmouseDown = sv.mouseDown;
        var originaltouchMove = sv.touchMove;
        var originalmouseMove = sv.mouseMove;

        container.removeEventListener('touchstart', sv.touchStart);
        container.removeEventListener('mousedown', sv.mouseDown);
        document.removeEventListener('touchmove', sv.touchMove);
        document.removeEventListener('mousemove', sv.mousemove);

        sv.touchStart = function (e) {
          e.preventDefault = function () {
          }
          originaltouchStart.apply(sv, [e]);
        }

        sv.touchMove = function (e) {
          e.preventDefault = function () {
          }
          originaltouchMove.apply(sv, [e]);
        }

        sv.mouseDown = function (e) {
          e.preventDefault = function () {
          }
          originalmouseDown.apply(sv, [e]);
        }

        sv.mouseMove = function (e) {
          e.preventDefault = function () {
          }
          originalmouseMove.apply(sv, [e]);
        }

        container.addEventListener("touchstart", sv.touchStart, false);
        container.addEventListener("mousedown", sv.mouseDown, false);
        document.addEventListener("touchmove", sv.touchMove, false);
        document.addEventListener("mousemove", sv.mouseMove, false);
      };

      //vm.handleScroll = function (l) {
      var handleScroll = function (l) {

        //console.log('incomming to handle scroll ' + l);

        var sv = $ionicScrollDelegate.$getByHandle(l).getScrollView();
        hc++;

        var container = sv.__container;

        var originaltouchStart = sv.touchStart;
        var originalmouseDown = sv.mouseDown;
        var originaltouchMove = sv.touchMove;
        var originalmouseMove = sv.mouseMove;

        container.removeEventListener('touchstart', sv.touchStart);
        container.removeEventListener('mousedown', sv.mouseDown);
        document.removeEventListener('touchmove', sv.touchMove);
        document.removeEventListener('mousemove', sv.mousemove);


        sv.touchStart = function (e) {
          e.preventDefault = function () {
          }
          originaltouchStart.apply(sv, [e]);
        }

        sv.touchMove = function (e) {
          e.preventDefault = function () {
          }
          originaltouchMove.apply(sv, [e]);
        }

        sv.mouseDown = function (e) {
          e.preventDefault = function () {
          }
          originalmouseDown.apply(sv, [e]);
        }

        sv.mouseMove = function (e) {
          e.preventDefault = function () {
          }
          originalmouseMove.apply(sv, [e]);
        }

        container.addEventListener("touchstart", sv.touchStart, false);
        container.addEventListener("mousedown", sv.mouseDown, false);
        document.addEventListener("touchmove", sv.touchMove, false);
        document.addEventListener("mousemove", sv.mouseMove, false);

        //handleScroll(l);
      }

    });

})();
