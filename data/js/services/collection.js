'use strict';

angular.module('RestedApp')
.factory('Collection', function($rootScope, DB, Modal) {
  var errorHandler = function(event) {
    Modal.throwError('An error occured when reading/writing to indexedDB: ', event);
  };

  return {
    addRequestToCollection: function(request) {

      // Create new collection if none exist
      if (!$rootScope.collections || !$rootScope.collections[0]) {
        $rootScope.collections.push({
          name: 'Collection',
          requests: [request]
        });

        DB.collections.add($rootScope.collections[0]).then(null, errorHandler);
      } else if ($rootScope.collections[0].requests.indexOf(request) === -1) {
        $rootScope.collections[0].requests.push(request);

        DB.collections.set($rootScope.collections[0]).then(null, errorHandler);
      } else {
        Modal.set({
          title: 'Hey!',
          body: 'Request is already in collection. Overwrite existing entry, or save as a new entry?',
          actions: [{
            text: 'Overwrite',
            click: function() {
              DB.collections.set($rootScope.collections[0]).then(Modal.remove, errorHandler);
            }
          }, {
            text: 'New',
            click: function() {
              DB.collections.get().then(function(data) {
                var unalteredCollections = data[0];

                if (unalteredCollections && unalteredCollections.requests) {
                  unalteredCollections.requests.push(request);
                  $rootScope.collections[0] = unalteredCollections;
                  DB.collections.set(unalteredCollections).then(Modal.remove, errorHandler);
                } else {
                  Modal.throwError('Sorry, something went wrong! Unaltered collections: ', unalteredCollections);
                }
              }, errorHandler);
            }
          }]
        });
      }
    },
    removeRequestFromCollection: function(collection, index) {
      Modal.set({
        title: 'Confirm deletion',
        body: 'Please confirm you wish to remove this request from your saved collection',
        actions: [{
          text: 'Confirm',
          click: function() {
            collection.requests.splice(index, 1);
            $rootScope.collections[0] = collection;
            DB.collections.set($rootScope.collections[0]).then(Modal.remove, errorHandler);
          }
        }]
      });
    },
    clearCollection: function(callback) {
      Modal.set({
        title: 'Confirm deletion',
        body: 'Please confirm that you wish to delete your entire collection. This is not reversible',
        actions: [{
          text: 'Confirm',
          click: function() {
            if (!$rootScope.collections || !$rootScope.collections[0]) {
              return callback();
            }
            $rootScope.collections[0].requests = [];
            DB.collections.set($rootScope.collections[0]).then(Modal.remove, errorHandler);
            callback();
          }
        }]
      });
    }
  };
});
