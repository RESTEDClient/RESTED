'use strict';

angular.module('RestedApp')
.factory('DB', ['DB_OBJECT_STORE_NAME', 'DB_URL_VARIABLES_STORE_NAME', 'DB_OPTIONS_STORE_NAME', 'DB_HISTORY_STORE_NAME', '$q', 'BrowserSync',
function(DB_OBJECT_STORE_NAME, DB_URL_VARIABLES_STORE_NAME, DB_OPTIONS_STORE_NAME, DB_HISTORY_STORE_NAME, $q, BrowserSync) {

  var message = function(success, message, object) {
    return { success: success, message: message, object: object };
  };

  function checkError(onSuccess, onError) {
    var lastError = chrome.runtime.lastError;
    if (lastError) {
      // Unset to not trigger next time
      chrome.runtime.lastError = undefined;

      onError(lastError);
    } else {
      onSuccess();
    }
  };

  // TODO Add try/catches to fallback to resetting db if things break
  var createStore = function(storeName) {
    return {
      get() {
        var deferred = $q.defer();

        chrome.storage.local.get(storeName, items => {

          checkError(function onSuccess() {
            deferred.resolve(items[storeName] || []);
          }, function onError(event) {
            deferred.reject(message(false, 'An error occured when fetching from storage.local! storeName=' + storeName, event));
          });

        });

        return deferred.promise;
      },
      add(item) {
        var deferred = $q.defer();

        if (!item || !item.name) {
          deferred.reject(message(false, 'Attempted to add using a bad item in storage.local! storeName=' + storeName, item));
          return deferred.promise;
        }

        this.get().then(items => {
          var newItems = items.concat(item);
          chrome.storage.local.set({ [storeName]: newItems }, () => {

            checkError(function onSuccess() {
              deferred.resolve(message(true, 'Successfully added an entry to the database', item));
              BrowserSync.set(storeName, newItems);
            }, function onError(event) {
              deferred.reject(message(false, 'An error occured when adding to storage.local! storeName=' + storeName, event));
            });

          });
        });

        return deferred.promise;
      },
      replace(items) {
        var deferred = $q.defer();

        chrome.storage.local.set({ [storeName]: items }, () => {

          checkError(function onSuccess() {
            deferred.resolve(message(true, 'Successfully replaced a collection', items));
              BrowserSync.set(storeName, items);
          }, function onError(event) {
            deferred.reject(message(false, 'An error occured when replacing a collection in storage.local! storeName=' + storeName, event));
          });

        });

        return deferred.promise;
      },
      set(item) {
        var deferred = $q.defer();

        if (!item || !item.name) {
          deferred.reject(message(false, 'Attempted to set a bad item in storage.local! storeName=' + storeName, item));
          return deferred.promise;
        }

        this.get().then(items => {
          var added = items.some((it, ind) => {
            if (it.name === item.name) {
              items[ind] = item;
              return true;
            }
          });

          // If no item was found to replace, append instead
          if (!added) {
            items.push(item);
          }

          chrome.storage.local.set({ [storeName]: items }, () => {

            checkError(function onSuccess() {
              deferred.resolve(message(true, 'Successfully updated an entry', item));
              BrowserSync.set(storeName, items);
            }, function onError(event) {
              deferred.reject(message(false, 'An error occured when updating and entry in storage.local! storeName=' + storeName, event));
            });

          });
        });

        return deferred.promise;
      },
      delete(item) {
        var deferred = $q.defer();

        if (!item || !item.name) {
          deferred.reject(message(false, 'Attempted to delete using a bad item in storage.local! storeName=' + storeName, item));
          return deferred.promise;
        }

        this.get().then(items => {
          var newItems = items.filter(i => i.name !== item.name );
          chrome.storage.local.set({ [storeName]: newItems }, () => {

            checkError(function onSuccess() {
              deferred.resolve(message(true, 'Successfully deleted an entry from the database', item));
              BrowserSync.set(storeName, newItems);
            }, function onError(event) {
              deferred.reject(message(false, 'An error occured when deleting an entry in storage.local! storeName=' + storeName, event));
            });

          });
        });

        return deferred.promise;
      }
    };
  };

  return {
    collections: createStore(DB_OBJECT_STORE_NAME),
    urlVariables: createStore(DB_URL_VARIABLES_STORE_NAME),
    options: createStore(DB_OPTIONS_STORE_NAME),
    history: createStore(DB_HISTORY_STORE_NAME),
  };
}]);
