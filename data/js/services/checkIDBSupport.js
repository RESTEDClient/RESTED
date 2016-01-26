'use strict';

angular.module('RestedApp')
.factory('checkIDBSupport', ['$q', function($q) {

  /**
   * Has to be async because of the way indexedDB is
   * implemented in Firefox private browsing...
   */
  return function checkIDBSupport() {
    var deferred = $q.defer();
    try {
      var indexedDB = window.indexedDB || window.mozIndexedDB;

      if (!indexedDB) {
        deferred.reject();
      }

      // In Firefox private mode, this will throw
      // an error because IndexedDB is only read,
      // not write.
      var test = indexedDB.open('_RESTED_TEST_IDB_SUPPORT', 1);
      if (!test) {
        deferred.resolve(false);
      }

      // Check if we successfully created test DB
      test.onerror = function() {
        deferred.resolve(false);
      }
      test.onsuccess = function() {
        deferred.resolve(true);
      }
    } catch(e) {
      deferred.resolve(false);
    }

    return deferred.promise;
  };
}]);
