'use strict';

angular.module('RestedApp')
.directive('collections', ['DEFAULT_REQUEST', 'IDB_SUPPORTED', 'Modal', 'Collection', 'DB', '$filter',
function(DEFAULT_REQUEST, IDB_SUPPORTED, Modal, Collection, DB, $filter) {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/collections.html',
    scope: {
      collections: '=',
      selectedRequest: '='
    },
    link: function(scope, element, attrs, controllers) {

      scope.indexedDBSupported = IDB_SUPPORTED;
      scope.removeFromCollection = Collection.removeRequestFromCollection;

      scope.selectRequest = function(request) {
        scope.selectedRequest = request;
      };

      scope.addNewCollection = Collection.newCollection;
      scope.deleteCollection = function(collection) {
        Modal.set({
          title: 'Goodbye collection',
          body: 'You are about to delete the collection "' + collection.name + '". Are you sure?',
          actions: [{
            text: 'Delete',
            click: function() {
              Collection.deleteCollection(collection);
              Modal.remove();
            }
          }]
        });
      };

      scope.toggleCollectionsOptions = function(collection) {
        scope.editing = collection.name;
      };

      scope.updateCollectionName = function(collection, newName) {
        scope.editing = null;
        Collection.updateCollectionName(collection, newName);
      };

      scope.handleDrop = function(item) {
        // Invalidate id - we track by id, and ngRepeat throws
        // up if it gets duplicate ids. This happens when we drag
        // and drop; the old item is invisible, but still present
        // in the list until manually removed (by the code).
        item.id = undefined;

        return item;
      };

      scope.handleCollectionMoved = function(collections, index) {
        collections.splice(index, 1);
        collections = $filter('setOrder')(collections);

        // We place this on $root immediately so we can
        // save the current state as it is currently
        // (Don't have to wait for next digest)
        scope.$root.collections = collections;
        Collection.saveAllCollections();
      };

      scope.handleMoved = function(collection, index) {
        collection.requests.splice(index, 1);
        Collection.saveAllCollections();
      };

      /**
       * Minimized state is persisted. The collection-body
       * is initialized to display: none via a static inline
       * style binding, and the rest of the logic is handled
       * here.
       */
      scope.minimizeCollection = function(collection, index) {
        collection.minimized = !collection.minimized;
        $(element.find('.collection-body')[index])[collection.minimized ? 'slideUp' : 'slideDown']();
        DB.collections.set(collection);
      };

      scope.addNewCollectionConfig = {
        title: 'Create collection',
        classes: ['fa', 'fa-plus']
      };

      scope.deleteCollectionConfig = {
        title: 'Delete',
        classes: ['fa', 'fa-trash']
      };

      scope.collectionOptionsConfig = {
        title: 'Change name',
        classes: ['fa', 'fa-pencil']
      };

      scope.collectionUpdateConfig = {
        title: 'Save',
        classes: ['fa', 'fa-check']
      };

      scope.removeRequestConfig = {
        title: 'Remove request',
        classes: ['fa', 'fa-times']
      };
    }
  };
}]);

