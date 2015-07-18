'use strict';

angular.module('RestedApp')
.factory('Collections', function(DB_VERSION, DB_NAME, DB_OBJECT_STORE_NAME, $q) {
  var localDB = window.indexedDB.open(DB_NAME, DB_VERSION);

  localDB.onerror = function(event) {
    console.error(event);
    alert('ERROR: Could not open connection to indexedDB. Collections will not work.');
  };

  // Initialize DB
  localDB.onupgradeneeded = function(event) {
    console.log('onupgradeneeded');
    var db = event.target.result;
    db.createObjectStore(DB_OBJECT_STORE_NAME, { keyPath: 'name' });
  };

  var onDBReady = function(fn) {
    localDB.onsuccess = function(event) {
      /*if (!store) {
        store = this.result;
        console.log(localDB.result);
      }*/

      fn(event);
    }
  };

  var message = function(success, message, object) {
    return {success: success, message: message, object: object}
  };

  return {
    get: function() {
      var deferred = $q.defer();

      onDBReady(function(event) {

        window.db = localDB;
        // Fetch objectStore
        var objectStore = localDB.result.transaction(DB_OBJECT_STORE_NAME).objectStore(DB_OBJECT_STORE_NAME);

        console.log('objectStore', objectStore);
        // Open cursor for iteration
        var result = [];
        objectStore.openCursor().onsuccess = function(event) {

          console.log('in it');
          var cursor = event.target.result;
          if (cursor) {
            result.push(cursor.value);
            cursor.continue();
          }
          else {
            deferred.resolve(result);
          }
        };
      });

      return deferred.promise;
    },
    add: function(collection) {
      var deferred = $q.defer();

      var transaction = db.result.transaction(['collections'], 'readwrite');

      transaction.onerror = function(event) {
        deferred.reject(message(false, 'An error occured when adding to database!', event));
      };

      transaction.oncomplete = function() {
        deferred.resolve(message(true, 'Successfully added an entry to the database', collection));
      };

      var objectStore = transaction.objectStore('collections');
      objectStore.add(collection);

      return deferred.promise;
    },
    set: function(collection) {
      var deferred = $q.defer();

      var objectStore = db.result.transaction(['collections'], "readwrite").objectStore("collections");
      var requestUpdate = objectStore.put(collection);

      requestUpdate.onerror = function(event) {
        deferred.reject(message(false, 'An error occured when updating an entry in the database!', event));
      };

      requestUpdate.onsuccess = function() {
        deferred.resolve(message(true, 'Successfully updated an entry', collection));
      };

      return deferred.promise;
    },
    delete: function(collection) {
      var deferred = $q.defer();

      var objectStore = db.result.transaction(['collections'], "readwrite").objectStore("collections");
      var requestDelete = objectStore.delete(collection.name);

      requestDelete.onerror = function(event) {
        deferred.reject(message(false, 'An error occured when deleting an entry in the database!', event));
      };

      requestDelete.onsuccess = function() {
        deferred.resolve(message(true, 'Successfully deleted an entry from the database', collection));
      };

      return deferred.promise;
    }
  };
});
