'use strict';

angular.module('RestedApp')
.factory('DB', ['DB_OBJECT_STORE_NAME', 'DB_URL_VARIABLES_STORE_NAME', 'DB_OPTIONS_STORE_NAME', '$q',
function(DB_OBJECT_STORE_NAME, DB_URL_VARIABLES_STORE_NAME, DB_OPTIONS_STORE_NAME, $q) {

  var message = function(success, message, object) {
    return { success: success, message: message, object: object };
  };

  var checkError = function(onSuccess, onError) {
    var lastError = chrome.runtime.lastError;
    if (lastError) {
      // Unset to not trigger next time
      chrome.runtime.lastError = undefined;

      onError(lastError);
    } else {
      onSuccess();
    }
  };

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

        this.get().then(items => {
          chrome.storage.local.set({ [storeName]: items.concat(item) }, function() {

            checkError(function onSuccess() {
              deferred.resolve(message(true, 'Successfully added an entry to the database', item));
            }, function onError(event) {
              deferred.reject(message(false, 'An error occured when adding to storage.local! storeName=' + storeName, event));
            });

          });
        });

        return deferred.promise;
      },
      set(item) {
        var deferred = $q.defer();

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
            }, function onError(event) {
              deferred.reject(message(false, 'An error occured when updating and entry in storage.local! storeName=' + storeName, event));
            });

          });
        });

        return deferred.promise;
      },
      delete(item) {
        var deferred = $q.defer();

        this.get().then(items => {
          chrome.storage.local.set({ [storeName]: items.filter(i => i.name !== item.name ) }, () => {

            checkError(function onSuccess() {
              deferred.resolve(message(true, 'Successfully deleted an entry from the database', item));
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
  };
}]);
