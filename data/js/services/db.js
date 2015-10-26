'use strict';

angular.module('RestedApp')
.factory('DB', ['DB_VERSION', 'DB_NAME', 'DB_OBJECT_STORE_NAME', 'DB_URL_VARIABLES_STORE_NAME', 'DB_OPTIONS_STORE_NAME', '$q', 'Modal',
function(DB_VERSION, DB_NAME, DB_OBJECT_STORE_NAME, DB_URL_VARIABLES_STORE_NAME, DB_OPTIONS_STORE_NAME, $q, Modal) {

  var localDB = window.indexedDB.open(DB_NAME, DB_VERSION);

  localDB.onerror = function(event) {
    Modal.throwError('ERROR: Could not open connection to indexedDB. Collections or URL variables will not work. ', event);
  };

  // Initialize DB
  localDB.onupgradeneeded = function(event) {
    console.info('DB upgrade needed, running initialize');

    var db = event.target.result;
    var storeNames = db.objectStoreNames;
    if (!storeNames.contains(DB_OBJECT_STORE_NAME)) {
      db.createObjectStore(DB_OBJECT_STORE_NAME, { keyPath: 'name' });
    }
    if (!storeNames.contains(DB_URL_VARIABLES_STORE_NAME)) {
      db.createObjectStore(DB_URL_VARIABLES_STORE_NAME, { keyPath: 'name' });
    }
    if (!storeNames.contains(DB_OPTIONS_STORE_NAME)) {
      db.createObjectStore(DB_OPTIONS_STORE_NAME, { keyPath: 'name' });
    }

    console.info('Upgrade completed. DB is now:', storeNames);
  };

  var queuedTransactions = [];
  var onDBReady = function(fn) {
    if(localDB.readyState === 'done') {
      fn();
    } else {
      // We need to queue transactions against the
      // database so transactions can run parallel
      // and not overwrite each other.
      queuedTransactions.push(fn);
      localDB.onsuccess = function runQueuedOperations() {
        queuedTransactions.forEach(function(transaction) {
          transaction();
        });
      };
    }
  };

  var message = function(success, message, object) {
    return { success: success, message: message, object: object };
  };

  var createStore = function(storeName) {
    return {
      get: function() {
        var deferred = $q.defer();

        onDBReady(function() {

          // Fetch objectStore
          var objectStore = localDB.result.transaction(storeName).objectStore(storeName);

          // Open cursor for iteration
          var result = [];
          var cursorObject = objectStore.openCursor();
          cursorObject.onsuccess = function(event) {

            var cursor = event.target.result;
            if (cursor) {
              result.push(cursor.value);
              cursor.continue();
            }
            else {
              deferred.resolve(result);
            }
          };

          cursorObject.onerror = function(event) {
            deferred.reject(message(false, 'An error occured when fetching from database!', event));
          };
        });

        return deferred.promise;
      },
      add: function(item) {
        var deferred = $q.defer();

        onDBReady(function() {
          var transaction = localDB.result.transaction([storeName], 'readwrite');

          transaction.onerror = function(event) {
            deferred.reject(message(false, 'An error occured when adding to database!', event));
          };

          transaction.oncomplete = function() {
            deferred.resolve(message(true, 'Successfully added an entry to the database', item));
          };

          var objectStore = transaction.objectStore(storeName);
          objectStore.add(item);
        });

        return deferred.promise;
      },
      set: function(item) {
        var deferred = $q.defer();

        onDBReady(function() {
          var objectStore = localDB.result.transaction([storeName], 'readwrite').objectStore(storeName);
          var requestUpdate = objectStore.put(item);

          requestUpdate.onerror = function(event) {
            deferred.reject(message(false, 'An error occured when updating an entry in the database!', event));
          };

          requestUpdate.onsuccess = function() {
            deferred.resolve(message(true, 'Successfully updated an entry', item));
          };
        });

        return deferred.promise;
      },
      delete: function(item) {
        var deferred = $q.defer();

        onDBReady(function() {
          var objectStore = localDB.result.transaction([storeName], 'readwrite').objectStore(storeName);
          var requestDelete = objectStore.delete(item.name);

          requestDelete.onerror = function(event) {
            deferred.reject(message(false, 'An error occured when deleting an entry in the database!', event));
          };

          requestDelete.onsuccess = function() {
            deferred.resolve(message(true, 'Successfully deleted an entry from the database', item));
          };
        });

        return deferred.promise;
      }
    };
  };

  return {
    collections: createStore(DB_OBJECT_STORE_NAME),
    urlVariables: createStore(DB_URL_VARIABLES_STORE_NAME),
    options: createStore(DB_OPTIONS_STORE_NAME)
  };
}]);
