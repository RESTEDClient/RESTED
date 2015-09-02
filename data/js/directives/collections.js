'use strict';

angular.module('RestedApp')
.directive('collections', function(DEFAULT_REQUEST, Modal) {
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

      scope.resetRequest = function() {
        Modal.set({
          title: 'Create new request',
          body: 'Please confirm clearing current request selection.\n Unsaved progress will be lost.',
          action: {
            text: 'OK',
            click: function() {
              scope.selectedRequest = angular.copy(DEFAULT_REQUEST);
              Modal.remove();
            }
          }
        });
      };

      scope.hideCollections = function() {
        // Logic handled in css and ngHide
        scope.$root.collectionsMinimized = !scope.$root.collectionsMinimized;
      };

      scope.hideCollectionsConfig = {
        title: 'Hide collections',
        classes: ['fa', 'fa-step-backward']
      };

      scope.resetRequestConfig = {
        title: 'Clear selection',
        classes: ['fa', 'fa-times']
      };

      scope.removeRequestConfig = {
        title: 'Remove request',
        classes: ['fa', 'fa-times']
      };
    }
  };
});
