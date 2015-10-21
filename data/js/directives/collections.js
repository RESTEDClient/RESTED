'use strict';

angular.module('RestedApp')
.directive('collections', ['DEFAULT_REQUEST', 'Modal', 'Collection',
function(DEFAULT_REQUEST, Modal, Collection) {
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
      scope.deleteCollection = Collection.deleteCollection;

      scope.toggleCollectionsOptions = function(collection) {
        scope.editing = collection.name;
      };

      scope.updateCollectionName = function(collection, newName) {
        scope.editing = null;
        collection.name = newName;

        // TODO save to DB
        // TODO check if key exists in db to prevent dupes
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

