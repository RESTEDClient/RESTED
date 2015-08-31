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
          body: 'Please confirm clearing current selection.\n Unsaved progress will be lost.',
          action: {
            text: 'OK',
            click: function() {
              scope.selectedRequest = angular.copy(DEFAULT_REQUEST);
              Modal.remove();
            }
          }
        });
      };

      scope.resetRequestConfig = {
        title: 'Clear selection',
        classes: ['fa', 'fa-plus']
      };

      scope.removeRequestConfig = {
        title: 'Remove request',
        classes: ['fa', 'fa-times']
      };
    }
  };
});
