'use strict';

angular.module('RestedApp')
.directive('collections', ['DEFAULT_REQUEST', 'Modal', 'Collection', 'DB',
function(DEFAULT_REQUEST, Modal, Collection, DB) {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/collections.html',
    scope: {
      collections: '=',
      selectedRequest: '=',
      removeFromCollection: '&'
    },
    link: function(scope, element, attrs, controllers) {

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
        item.id = undefined;
        return item;
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

