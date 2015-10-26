'use strict';

angular.module('RestedApp')
.factory('Collection', ['DEFAULT_SELECTED_COLLECTION', '$rootScope', '$filter', 'DB', 'Modal',
function(DEFAULT_SELECTED_COLLECTION, $rootScope, $filter, DB, Modal) {
  var errorHandler = function(event) {
    Modal.throwError('An error occured when reading/writing to indexedDB: ', event);
  };

  // Checks whether the collection name is taken
  var isUnique = function(name) {
    return $rootScope.collections.every(function(item) {
      return item.name.trim() !== name.trim();
    });
  };

  return {
    newCollection: function(requests) {
      var i = 0;

      // Iterate over collections named Collection and add
      // index to collection name to prevent duplicates.
      do {
        var name = 'Collection ' + (i++ ? i : '');
      } while (!isUnique(name));

      if(!Array.isArray(requests)) {
        requests = [];
      }

      DB.collections.add({ name: name.trim(), requests: requests }).then(function() {
        $rootScope.collections.push({ name: name, requests: requests });
        Modal.remove();
      }, errorHandler);
    },
    deleteCollection: function(collection) {
      DB.collections.delete(collection).then(function() {
        $rootScope.collections = $rootScope.collections.filter(function(item) {
          return item !== collection;
        });
      }, errorHandler);
    },
    updateCollectionName: function(collection, newName) {
      if (!isUnique(newName)) {
        return Modal.set({
          title: 'Sorry doc',
          body: 'A collection with that name already exists'
        });
      } else if (!newName) {
        return Modal.set({
          title: 'Sorry doc',
          body: 'You need a collection name to go with that name change'
        });
      } else if (!collection) {
        return Modal.throwError('You seem to be missing a collection to update. How strange. Collection: ', collection);
      }

      // Delete old collection
      DB.collections.delete({ name: collection.name }).then(function() {

        // Add new collection with updated name (primary key)
        collection.name = newName;
        DB.collections.set(collection).then(null, errorHandler);
      }, errorHandler);
    },
    saveAllCollections: function() {
      $rootScope.collections.forEach(function(collection) {
        DB.collections.set(collection).then(null, errorHandler);
      });
    },
    addRequestToCollection: function(request, collectionIndex) {
      if (!collectionIndex && collectionIndex !== 0) {
        collectionIndex = DEFAULT_SELECTED_COLLECTION;
        console.warn('Falling back to ' + DEFAULT_SELECTED_COLLECTION + ' for collectionIndex:', collectionIndex);
      }

      try {

        // Create new collection if none exist
        if (!$rootScope.collections || !$rootScope.collections[0]) {
          if (!$rootScope.collections) {
            $rootScope.collections = [];
          }
          $rootScope.collections.push({
            name: 'Collection',
            requests: [request]
          });

          DB.collections.add($rootScope.collections[0]).then(Modal.remove, errorHandler);

        // If there is no dupe in selected collection, add
        } else if ($rootScope.collections[collectionIndex].requests.indexOf(request) === -1) {
          $rootScope.collections[collectionIndex].requests.push(request);

          DB.collections.set($rootScope.collections[collectionIndex]).then(Modal.remove, errorHandler);

        // If there is a duplicate request, query user for action
        } else {
          Modal.set({
            title: 'Hey!',
            body: 'Request is already in collection. Overwrite existing entry, or save as a new entry?',
            actions: [{
              text: 'Overwrite',
              click: function() {
                DB.collections.set($rootScope.collections[collectionIndex]).then(Modal.remove, errorHandler);
              }
            }, {
              text: 'New',
              click: function() {
                DB.collections.get().then(function(data) {
                  var unalteredCollections = $filter('orderBy')(data, 'order')[collectionIndex];

                  if (unalteredCollections && unalteredCollections.requests) {

                    // Ensure we dont get dupe ids
                    var newRequest = angular.copy(request);
                    newRequest.id = undefined;
                    $filter('uuidAssign')(newRequest);
                    unalteredCollections.requests.push(newRequest);

                    $rootScope.collections[collectionIndex] = unalteredCollections;
                    DB.collections.set(unalteredCollections).then(Modal.remove, errorHandler);
                  } else {
                    Modal.throwError('Sorry, something went wrong! Unaltered collections: ', unalteredCollections);
                  }
                }, errorHandler);
              }
            }]
          });
        }
      } catch (e) {
        console.error(e);
        Modal.throwError('error in Collection.addRequestToCollection: ', e.toString());
      }
    },
    removeRequestFromCollection: function(collection, index, collectionIndex) {
      console.log('collectionIndex', collectionIndex);
      Modal.set({
        title: 'Confirm deletion',
        body: 'Please confirm you wish to remove this request from your saved collection',
        actions: [{
          text: 'Confirm',
          click: function() {
            collection.requests.splice(index, 1);
            DB.collections.set(collection).then(Modal.remove, errorHandler);
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
}]);

