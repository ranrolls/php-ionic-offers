(function () {

  'use strict';

  angular.module('service')

    .factory('url', function (gvar) {

      self.domain = gvar.domain;

      function getUrl(params) {
        switch (params) {

          case 'allOffers':
            //return self.domain + 'offers.php?action=offerlist&number=1';
            return self.domain + 'offers.php?action=offerlist';
            break;

          case 'rootCats':
            return self.domain + 'category.php';
            break;

          //http://onm.socialcircle.marketing/webservice/subcategory.php?action=cat_by_id
          // &catid=1
          // &latitude=28.5165666&longitude=77.2808931
          case 'subCats':
            return self.domain + 'subcategory.php?action=cat_by_id';
            break;

            //http://onm.socialcircle.marketing/webservice/subcatid_offer_details.php?action=offerlist
            // &subcatid=1
            // 8&latitude=28.5165666&longitude=77.2808931
            // &number=1
          case 'products':
            return self.domain + 'subcatid_offer_details.php?action=offerlist';
            break;

          // http://onm.socialcircle.marketing/webservice/all_main_menu.php
          case 'settingsMenu':
            return self.domain + 'all_main_menu.php';
            break;

//  http://onm.socialcircle.marketing/webservice/setting.php?alias=terms-conditions
          case 'settingsDetail':
            return self.domain + 'setting.php';
            break;

//  http://onm.socialcircle.marketing/webservice/userinformation.php?action=userinformation
// &username=vishal&email=vishal.k@refine-interactive.com
// &deviceid=123&deviceversion=1.2.3&devicemodel=A210&deviceplatform=android
          case 'ui':
            return self.domain + 'userinformation.php?action=userinformation';
            break;

            //http://onm.socialcircle.marketing/webservice/contactservice.php?action=contactUs
            // &name=vishal&email=vishal.k@refine-interactive.com&message=Hello Testing&subject=test
          case 'contact-us':
            return self.domain + 'contactservice.php?action=contactUs';
            break;

            //http://onm.socialcircle.marketing/webservice/offerdetails_byid.php?offerID=10
          case 'offer':
            return self.domain + 'offerdetails_byid.php';
            break;

          case 'forgot_pasword_email':
            return self.domain + 'forgotpassword.php';
            break;

          case 'registration':
            return self.domain + 'userregistration.php';
            break;

          case 'forgot_pasword_verify':
            return self.domain + 'forgotpassword.php?mode=verifytoken';
            break;

          case 'forgot_pasword_reset':
            return self.domain + 'forgotpassword.php?mode=setpassword';
            break;

          case 'edit_profile':
            return self.domain + 'userregistration.php?action=editprofile';
            break;

          case 'search-category':
            return self.domain + 'search_cat.php?action=search_category';
            break;

          case 'search-list':
            return self.domain + 'search_cat.php?action=textsearch';
            break;

          case 'search-item':
            return self.domain + 'search_cat.php?action=search_result';
            break;

          case 'user-image':
            return self.domain + 'image_by_userid.php';
            break;

          case 'upload':
            return self.domain + 'upload.php';
            break;

          case 'push-step-one':
            return self.domain + 'pushmessage.php?action=save_device_token';
            break;
            //onm.socialcircle.marketing/webservice/versionupdate.php?version=0.0.3&deviceid=433daaa3383ff40a

          case 'vu':
            return self.domain + 'versionupdate.php';
            break;

          case 'default':
            return 'no such parameter defined';
            break;

        }
      }

      return {
        getUrl: getUrl //Get url for respective incomming services
      };

    });


})();
