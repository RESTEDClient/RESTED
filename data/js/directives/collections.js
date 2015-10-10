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

      scope.removeRequestConfig = {
        title: 'Remove request',
        classes: ['fa', 'fa-times']
      };
    }
  };
});
