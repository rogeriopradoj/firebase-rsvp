angular.module("myApp",["firebase","ngRoute","ngResource","ngSanitize","ngMessages","mediaCheck","ui.bootstrap"]),function(){"use strict";function t(t,e,n,r,o,a){function i(t){u.rsvps=[];for(var e=t,n=0;n<e.length;n++){var r=e[n];r.userId===u.user.uid&&u.rsvps.push(r)}u.rsvpsReady=!0}var u=this;u.data=n.data(),u.user=n.ref.getAuth(),u.logins=o.LOGINS;{var s=u.user.provider;u.user[s].cachedUserProfile}u.userName=u.user[s].displayName,u.userPicture=r.getUserPicture(u.user);var c=n.rsvps();c.$loaded().then(i);var l=e.search().view;u.tabs=[{name:"User Info",query:"user-info"},{name:"RSVPs",query:"rsvps"}],u.currentTab=l?l:"user-info",t.$on("$routeUpdate",function(t,e){u.currentTab=e.params.view||"user-info"}),u.getProfile=function(){function t(t){u.user=t,u.administrator=u.user.isAdmin,u.linkedAccounts=User.getLinkedAccounts(u.user,"account"),u.showAccount=!0,u.rsvps=u.user.rsvps}function e(t){u.errorGettingUser=!0}userData.getUser().then(t,e)}}angular.module("myApp").controller("AccountCtrl",t),t.$inject=["$scope","$location","Fire","Utils","OAUTH","$timeout"]}(),function(){"use strict";function t(t,e,n){function r(){o.showAdmin=o.user.uid===o.data.master}var o=this;o.user=n.ref.getAuth(),o.data=n.data(),o.data.$loaded().then(r);var a=e.search().view;o.tabs=[{name:"Events",query:"events"},{name:"Add Event",query:"add-event"}],o.currentTab=a?a:"events",t.$on("$routeUpdate",function(t,e){o.currentTab=e.params.view||"events"}),o.showGuests=function(t,e){o.showGuestsEventId=t,o.showGuestsEventName=e,o.showModal=!0}}angular.module("myApp").controller("AdminCtrl",t),t.$inject=["$scope","$location","Fire"]}(),function(){"use strict";function t(t,e,n,r){var o=this;o.evtUrl=e.protocol()+"://"+e.host()+"/event/",o.blurUrlInput=function(){o.copyInput=null},o.showUrlInput=function(t){o.copyInput=t,n(function(){angular.element("#e"+t).find("input").select()})},o.events=t.events(),o.sortStartDate=function(t){return r.getJSDatetime(t.startDate,t.startTime)}}angular.module("myApp").controller("AdminEventListCtrl",t),t.$inject=["Fire","$location","$timeout","Event"]}(),function(){"use strict";function t(t,e,n,r){function o(t){s.editEvent=l.$getRecord(c),s.showEditForm=!0}function a(){s.btnDelete=!1,s.btnDeleteText="Delete Event"}function i(){s.btnDeleteText="Deleted!",s.btnDelete=!0,s.editEvent={},r(function(){n.path("/admin")},1500)}function u(){s.btnDeleteText="Error deleting!",r(a,3e3)}var s=this,c=e.eventId,l=t.events();s.tabs=["Update Details","Delete Event"],s.currentTab=0,s.changeTab=function(t){s.currentTab=t},s.user=t.ref.getAuth(),s.data=t.data(),l.$loaded(o),a(),s.deleteEvent=function(){function e(){angular.forEach(n,function(t){t.eventId===s.editEvent.$id&&n.$remove(t)})}var n=t.rsvps();s.btnDeleteText="Deleting...",n.$loaded().then(e),l.$remove(s.editEvent).then(i,u)}}angular.module("myApp").controller("EditEventCtrl",t),t.$inject=["Fire","$routeParams","$location","$timeout"]}(),function(){"use strict";function t(t,e,n,r,o){function a(a){function i(t){return r("date")(t,"MM/dd/yyyy")}function u(){d.btnSaved=!1,d.btnSubmitText=f?"Submit":"Update"}function s(){n.search("view","events")}function c(t){d.btnSaved=!0,d.btnSubmitText=f?"Saved!":"Updated!",f&&(d.showRedirectMsg=!0,e(s,2500)),m&&(d.showUpdateDetailLink=!0,e(u,2500))}function l(t){d.btnSaved="error",d.btnSubmitText=f?"Error saving!":"Error updating!",console.log(d.btnSubmitText,t),e(u,3e3)}var d=this,f=!!d.prefillModelId==!1,m=!!d.prefillModelId==!0,v=t.events();d.timeRegex=/^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/i,m&&v.$loaded().then(function(){d.formModel=v.$getRecord(d.prefillModelId)}),d.minDate=new Date,d.dateOptions={showWeeks:!1},d.startDateOpen=!1,d.endDateOpen=!1,d.toggleDatepicker=function(t,e){t.preventDefault(),t.stopPropagation(),d[e+"Open"]=!d[e+"Open"]},d.startDateBlur=function(){d.formModel&&d.formModel.startDate&&!d.formModel.endDate&&(d.formModel.endDate=i(d.formModel.startDate))},u(),d.validateDaterange=function(){if(d.formModel&&d.formModel.startDate&&d.formModel.startTime&&d.formModel.endDate&&d.formModel.endTime){var t=o.getJSDatetime(d.formModel.startDate,d.formModel.startTime),e=o.getJSDatetime(d.formModel.endDate,d.formModel.endTime);d.validDaterange=0>t-e}},d.submitEvent=function(){function e(){angular.forEach(n,function(t){t.eventId===d.formModel.$id&&t.eventName!==d.formModel.title&&(t.eventName=d.formModel.title,n.$save(t))})}if(d.formModel.startDate=i(d.formModel.startDate),d.formModel.endDate=i(d.formModel.endDate),f)v.$add(d.formModel).then(c,l);else if(m){var n=t.rsvps();n.$loaded().then(e),v.$save(d.formModel).then(c,l)}}}return a.$inject=["$scope"],{restrict:"EA",scope:{prefillModelId:"@"},templateUrl:"/ng-app/admin/eventForm.tpl.html",controller:a,controllerAs:"ef",bindToController:!0}}angular.module("myApp").directive("eventForm",t),t.$inject=["Fire","$timeout","$location","$filter","Event"]}(),function(){"use strict";function t(){function t(t,e,n,r){var o=new Date,a=o.setDate(o.getDate()-1);r.$parsers.unshift(function(t){var e=Date.parse(t),n=0>a-e;return r.$setValidity("pastDate",n),n?t:void 0}),r.$formatters.unshift(function(t){var e=Date.parse(t),n=0>a-e;return r.$setValidity("pastDate",n),t})}return t.$inject=["$scope","$elem","$attrs","ngModel"],{restrict:"A",require:"ngModel",link:t}}angular.module("myApp").directive("validateDateFuture",t),t.$inject=["$timeout","$location","$filter","Event"]}(),function(){"use strict";function t(t){function e(e){function n(t){function n(t){var e=0;r.guests=t;for(var n=0;n<r.guests.length;n++){var o=r.guests[n];o.attending&&(e+=o.guests)}r.totalGuests=e,r.guestsReady=!0}var o=t;e.$watch("g.eventId",function(t,e){if(t){var a=[];r.guestsReady=!1;for(var i=0;i<o.length;i++){var u=o[i];u.eventId===r.eventId&&a.push(u)}n(a)}})}var r=this,o=t.rsvps();o.$loaded().then(n),r.closeModal=function(){r.showModal=!1}}return e.$inject=["$scope"],{restrict:"EA",scope:{eventId:"=",eventName:"=",showModal:"="},templateUrl:"/ng-app/admin/viewEventGuests.tpl.html",controller:e,controllerAs:"g",bindToController:!0}}angular.module("myApp").directive("viewEventGuests",t),t.$inject=["Fire"]}(),function(){"use strict";function t(t,e){function n(t){var n,r=t.startDate,o=new Date(r),a=t.startTime,i=t.endDate,u=new Date(i),s=t.endTime,c="MMM d yyyy",l=e("date")(o,c),d=e("date")(u,c);return n=l===d?l+", "+a+" - "+s:l+", "+a+" - "+d+", "+s}function r(t,e){var n,r=new Date(t),o=e.split(" "),a=o[0].split(":"),i=1*a[0],u=1*a[1],s=o[1];return"PM"==s&&12!==i&&(i+=12),n=new Date(r.getFullYear(),r.getMonth(),r.getDate(),i,u)}function o(t){var e=r(t.endDate,t.endTime),n=new Date;return n>e}return{getPrettyDatetime:n,getJSDatetime:r,expired:o}}angular.module("myApp").factory("Event",t),t.$inject=["Utils","$filter"]}(),function(){"use strict";function t(t,e,n){function r(){return t(s)}function o(){var t=new Firebase(u+"data");return e(t)}function a(){var t=new Firebase(u+"events");return n(t)}function i(){var t=new Firebase(u+"rsvps");return n(t)}var u="https://intense-heat-5822.firebaseio.com/",s=new Firebase(u);return{uri:u,ref:s,auth:r,data:o,events:a,rsvps:i}}angular.module("myApp").factory("Fire",t),t.$inject=["$firebaseAuth","$firebaseObject","$firebaseArray"]}(),function(){"use strict";angular.module("myApp").constant("MQ",{SMALL:"(max-width: 767px)",LARGE:"(min-width: 768px)"})}(),function(){"use strict";angular.module("myApp").constant("OAUTH",{LOGINS:[{account:"google",name:"Google",url:"http://accounts.google.com"},{account:"twitter",name:"Twitter",url:"http://twitter.com"},{account:"facebook",name:"Facebook",url:"http://facebook.com"},{account:"github",name:"GitHub",url:"http://github.com"}]})}(),function(){"use strict";function t(){function t(t){var e=t.provider,n=t[e].cachedUserProfile;return"github"===e?n.avatar_url:"google"===e?n.picture:"twitter"===e?n.profile_image_url:"facebook"===e?n.picture.data.url:void 0}function e(t){var e=["th","st","nd","rd"],n=t%100;return e[(n-20)%10]||e[n]||e[0]}return{getUserPicture:t,getOrdinal:e}}angular.module("myApp").factory("Utils",t)}(),function(){"use strict";function t(t,e,n){t.$on("$routeChangeStart",function(r,o,a){var i=n.ref.getAuth();o&&o.$$route&&(o.$$route.secure&&!i&&(t.authPath=e.path(),t.$evalAsync(function(){e.path("/login")})),"/login"===o.$$route.originalPath&&i&&t.$evalAsync(function(){e.path(t.authPath?t.authPath:"/")}))})}angular.module("myApp").run(t),t.$inject=["$rootScope","$location","Fire"]}(),function(){"use strict";function t(t,e){t.when("/",{templateUrl:"ng-app/events/Events.view.html",secure:!0}).when("/login",{templateUrl:"ng-app/login/Login.view.html"}).when("/event/:eventId",{templateUrl:"ng-app/event-detail/EventDetail.view.html",secure:!0}).when("/event/:eventId/edit",{templateUrl:"ng-app/admin/EditEvent.view.html",secure:!0}).when("/account",{templateUrl:"ng-app/account/Account.view.html",secure:!0,reloadOnSearch:!1}).when("/admin",{templateUrl:"ng-app/admin/Admin.view.html",secure:!0,reloadOnSearch:!1}).otherwise({redirectTo:"/"}),e.html5Mode({enabled:!0}).hashPrefix("!")}angular.module("myApp").config(t),t.$inject=["$routeProvider","$locationProvider"]}(),function(){function t(t,e){function n(n,r,o){function a(){var t=r.find(".ad-test");n.ab.blocked=t.height()<=0||!r.find(".ad-test:visible").length}n.ab={},n.ab.host=e.host(),t(a,200)}return n.$inject=["$scope","$elem","$attrs"],{restrict:"EA",link:n,template:'<div class="ad-test fa-facebook fa-twitter" style="height:1px;"></div><div ng-if="ab.blocked" class="ab-message alert alert-danger"><i class="fa fa-ban"></i> <strong>AdBlock</strong> is prohibiting important functionality! Please disable ad blocking on <strong>{{ab.host}}</strong>. This site is ad-free.</div>'}}angular.module("myApp").directive("detectAdblock",t),t.$inject=["$timeout","$location"]}(),function(){"use strict";function t(t){if("object"==typeof t.data)return t.data;throw new Error("retrieved data is not typeof object.")}function e(e){this.getJSON=function(){return e.get("/ng-app/data/data.json").then(t)}}angular.module("myApp").service("localData",e),e.$inject=["$http"]}(),function(){"use strict";var t=angular.module("mediaCheck",[]);t.service("mediaCheck",["$window","$timeout",function(t,e){this.init=function(n){var r,o,a,i,u=n.scope,s=n.mq,c=n.debounce,l=angular.element(t),d=void 0,f=void 0!==t.matchMedia&&!!t.matchMedia("!").addListener,m=void 0,v=void 0,p=c?c:250;if(f)return v=function(t){t.matches&&"function"==typeof n.enter?n.enter(t):"function"==typeof n.exit&&n.exit(t),"function"==typeof n.change&&n.change(t)},(d=function(){return m=t.matchMedia(s),o=function(){return v(m)},m.addListener(o),l.bind("orientationchange",o),u.$on("$destroy",function(){m.removeListener(o),l.unbind("orientationchange",o)}),v(m)})();r={},v=function(t){return t.matches?!!r[s]==!1&&"function"==typeof n.enter&&n.enter(t):(r[s]===!0||null==r[s])&&"function"==typeof n.exit&&n.exit(t),(t.matches&&!r[s]||!t.matches&&(r[s]===!0||null==r[s]))&&"function"==typeof n.change&&n.change(t),r[s]=t.matches};var g=function(t){var e=document.createElement("div");return e.style.width="1em",e.style.position="absolute",document.body.appendChild(e),px=t*e.offsetWidth,document.body.removeChild(e),px},h=function(t,e){var n;switch(n=void 0,e){case"em":n=g(t);break;default:n=t}return n};r[s]=null,a=function(){var e=s.match(/\((.*)-.*:\s*([\d\.]*)(.*)\)/),n=e[1],r=h(parseInt(e[2],10),e[3]),o={},a=t.innerWidth||document.documentElement.clientWidth;return o.matches="max"===n&&r>a||"min"===n&&a>r,v(o)};var $=function(){clearTimeout(i),i=e(a,p)};return l.bind("resize",$),u.$on("$destroy",function(){l.unbind("resize",$)}),a()}}])}(),function(){"use strict";function t(t){return function(e){return t.trustAsHtml(e)}}angular.module("myApp").filter("trustAsHTML",t),t.$inject=["$sce"]}(),function(){"use strict";function t(t,e,n){function r(r){function o(){n(function(){r.vs.viewformat="small"})}function a(){n(function(){r.vs.viewformat="large"})}r.vs={},t.init({scope:r,mq:e.SMALL,enter:o,exit:a})}return r.$inject=["$scope"],{restrict:"EA",link:r}}angular.module("myApp").directive("viewSwitch",t),t.$inject=["mediaCheck","MQ","$timeout"]}(),function(){"use strict";function t(t,e,n,r,o){function a(){function t(){for(var t=0;t<e.length;t++){var n=e[t];if(n.eventId===c&&n.userId===s.user.uid){s.rsvpObj=n;break}}s.noRsvp=!s.rsvpObj;var r=s.noRsvp?null:s.rsvpObj.guests;!s.noRsvp&&!!r==!1||1==r?s.guestText=s.rsvpObj.name+" is":r&&r>1&&(s.guestText=s.rsvpObj.name+" + "+(r-1)+" are "),s.attendingText=!s.noRsvp&&s.rsvpObj.attending?"attending":"not attending",s.rsvpBtnText=s.noRsvp?"RSVP":"Update my RSVP",s.showEventDownload=s.rsvpObj&&s.rsvpObj.attending,s.createOrUpdate=s.noRsvp?"create":"update",s.rsvpReady=!0}var e=r.rsvps();e.$loaded().then(t)}function i(){s.cal=ics();var t=o.getJSDatetime(s.detail.startDate,s.detail.startTime),e=o.getJSDatetime(s.detail.endDate,s.detail.endTime);s.cal.addEvent(s.detail.title,s.detail.description,s.detail.location,t,e)}function u(t){s.detail=l.$getRecord(c),s.detail&&(s.detail.prettyDate=o.getPrettyDatetime(s.detail),s.detail.expired=o.expired(s.detail)),s.eventReady=!0}var s=this,c=n.eventId;s.data=r.data(),s.user=r.ref.getAuth(),s.showModal=!1,s.openRsvpModal=function(){s.showModal=!0},a(),e.$on("rsvpSubmitted",a),s.downloadIcs=function(){s.cal.download()};var l=r.events();l.$loaded(u);var d=t.$watch("event.rsvpReady",function(t,e){t&&s.detail&&s.detail.rsvp&&(i(),d())})}angular.module("myApp").controller("EventDetailCtrl",t),t.$inject=["$scope","$rootScope","$routeParams","Fire","Event"]}(),function(){"use strict";function t(t,e,n){function r(r){function o(){c=t.rsvps(),c.$loaded(function(){l.formModel=c.$getRecord(l.formModelId)})}function a(){var t=r.$watch("rf.formModel.attending",function(e,n){e!==!0||n||l.formModel.guests||(l.formModel.guests=1,t())})}function i(){l.btnSaved=!1,l.btnSubmitText=d?"Submit RSVP":"Update RSVP"}function u(){l.btnSaved=!0,l.btnSubmitText=d?"Submitted!":"Updated!",n.$broadcast("rsvpSubmitted"),d=!1,f=!0,a(),e(function(){i(),l.showModal=!1},1e3)}function s(t){l.btnSaved="error",l.btnSubmitText=d?"Error submitting!":"Error updating!",console.log(l.btnSubmitText,t),e(i,3e3)}var c,l=this,d=!!l.formModelId==!1,f=!!l.formModelId==!0;l.numberRegex=/^([1-9]|10)$/,d?(c=t.rsvps(),l.formModel={userId:l.userId,eventName:l.event.title,eventId:l.event.$id,name:l.userName}):f&&o(),a(),i(),n.$on("rsvpSubmitted",o),l.submitRsvp=function(){l.btnSubmitText="Sending...",l.formModel.attending||(l.formModel.guests=0),d?c.$add(l.formModel).then(u,s):f&&c.$save(l.formModel).then(u,s)},l.closeModal=function(){l.showModal=!1}}return r.$inject=["$scope"],{restrict:"EA",scope:{event:"=",userName:"@",userId:"@",formModelId:"@",showModal:"="},templateUrl:"/ng-app/event-detail/rsvpForm.tpl.html",controller:r,controllerAs:"rf",bindToController:!0}}angular.module("myApp").directive("rsvpForm",t),t.$inject=["Fire","$timeout","$rootScope"]}(),function(){"use strict";function t(t,e){function n(t){for(var n=0;n<r.allEvents.length;n++){var o=r.allEvents[n];o.startDateJS=e.getJSDatetime(o.startDate,o.startTime),o.expired=e.expired(o)}r.eventsReady=!0}var r=this;r.allEvents=t.events(),r.user=t.ref.getAuth(),r.allEvents.$loaded().then(n),r.sortStartDate=function(t){return e.getJSDatetime(t.startDate,t.startTime)}}angular.module("myApp").controller("EventsCtrl",t),t.$inject=["Fire","Event"]}(),function(){"use strict";function t(){return function(t){var e,n=new Date(t),r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],o=r[n.getMonth()],a=n.getDate(),i=n.getFullYear();return e=o+" "+a+", "+i}}angular.module("myApp").filter("prettyDate",t)}(),function(){"use strict";function t(t,e,n,r){function o(t){i.localData=t}function a(e){i.user=e,e||t.path("/login")}var i=this,u=n.auth();e.getJSON().then(o),i.data=n.data(),i.user=n.ref.getAuth(),u.$onAuth(a),i.logout=function(){u.$unauth()},i.indexIsActive=function(e){return t.path()===e},i.navIsActive=function(e){return t.path().substr(0,e.length)===e}}angular.module("myApp").controller("HeaderCtrl",t),t.$inject=["$location","localData","Fire","$rootScope"]}(),function(){"use strict";function t(t,e,n){function r(r){function o(){c.removeClass("nav-closed").addClass("nav-open"),s=!0}function a(){c.removeClass("nav-open").addClass("nav-closed"),s=!1}function i(){a(),n(function(){r.nav.toggleNav=function(){s?a():o()}}),r.$on("$locationChangeSuccess",a)}function u(){n(function(){r.nav.toggleNav=null}),c.removeClass("nav-closed nav-open")}r.nav={};var s,c=angular.element("body");t.init({scope:r,mq:e.SMALL,enter:i,exit:u})}return r.$inject=["$scope","$element","$attrs"],{restrict:"EA",link:r}}angular.module("myApp").directive("navControl",t),t.$inject=["mediaCheck","MQ","$timeout"]}(),function(){"use strict";function t(t,e,n,r,o,a,i,u){function s(t){c.localData=t}var c=this,l=t.auth();l.$onAuth(function(t){t&&o.path("/")}),a.getJSON().then(s),c.logins=n.LOGINS,c.authenticate=function(t){function n(t){c.loggingIn=!1,o.path(r.authPath?r.authPath:"/")}function a(t){console.log(t.data),c.loggingIn="error",c.loginMsg=""}function s(){l.$authWithOAuthPopup(t).then(n)["catch"](a)}function d(){l.$authWithOAuthRedirect(t,a)}c.loggingIn=!0,u.init({scope:e,mq:i.SMALL,enter:d,exit:s})}}angular.module("myApp").controller("LoginCtrl",t),t.$inject=["Fire","$scope","OAUTH","$rootScope","$location","localData","MQ","mediaCheck"]}();