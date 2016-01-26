'use strict';

// We have to delay the entire
// loading of the main route until we
// know of the client supports
// indexeddb because of how firefox
// handles private mode.
angular.module('RestedApp', ['dndLists', 'ngRoute'])
.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/', {
      controller: 'RootCtl',
      templateUrl: 'views/main.html',
      resolve:{
        'IDB_SUPPORTED': function(checkIDBSupport){
          return checkIDBSupport();
        }
      }
    })
    .otherwise('/');
}]);

