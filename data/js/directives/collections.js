'use strict';

angular.module('RestedApp')
.directive('collections', function(DEFAULT_REQUEST) {
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
        scope.selectedRequest = angular.copy(DEFAULT_REQUEST);
      };

      scope.resetRequestConfig = {
        title: 'Clear request selection',
        classes: ['fa', 'fa-plus']
      };
    }
  }
});
