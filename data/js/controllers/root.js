'use strict';

/**
 * The only reason this controller exists is to
 * hold $rootScope and to allow us putting IDB_SUPPORTED
 * on $rootScope before any injection og DB occurs.
 */
angular.module('RestedApp')
.controller('RootCtl', ['DEFAULT_REQUEST', 'DEFAULT_SELECTED_COLLECTION', 'IDB_SUPPORTED', '$rootScope',
function(DEFAULT_REQUEST, DEFAULT_SELECTED_COLLECTION, IDB_SUPPORTED, $rootScope) {
  $rootScope.request = angular.copy(DEFAULT_REQUEST);
  $rootScope.selectedCollectionIndex = DEFAULT_SELECTED_COLLECTION;
  $rootScope.collections = [];
  $rootScope.urlVariables = [];
  $rootScope.options = {};
  $rootScope.IDB_SUPPORTED = IDB_SUPPORTED;
  console.log('SUPPORT?!?!', IDB_SUPPORTED);
}]);

