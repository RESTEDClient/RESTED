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

      /*
       * This is only temporary. When collection groups
       * are implemented, we want to be able to delete
       * individual collection groups, not the entire
       * collections array.
       */
      scope.clearCollectionConfig = {
        title: 'Delete collection',
        classes: ['fa', 'fa-trash']
      };

      scope.clearCollection = function() {
        Collection.clearCollection(Modal.remove);
      };

      scope.removeRequestConfig = {
        title: 'Remove request',
        classes: ['fa', 'fa-times']
      };
    }
  };
}]);

