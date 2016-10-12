'use strict';

angular.module('RestedApp')
.directive('history', ['DEFAULT_REQUEST', 'Modal', 'History', 'DB', '$filter',
function(DEFAULT_REQUEST, Modal, History, DB, $filter) {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/history.html',
    scope: {
      history: '=',
      selectedRequest: '='
    },
    link: function(scope, element, attrs, controllers) {

      scope.removeFromHistory = History.removeRequestFromHistory;
      scope.clearHistory = History.clearHistory;

      scope.selectRequest = function(request) {
        // Immutable history - copy request instead of referring to it
        scope.selectedRequest = angular.copy(request);
      };

      scope.toggleCollectionsOptions = function(collection) {
        scope.editing = collection.name;
      };

      scope.addNewCollectionConfig = {
        title: 'Create collection',
        classes: ['fa', 'fa-plus']
      };

      scope.clearHistoryConfig = {
        title: 'Clear history',
        classes: ['fa', 'fa-trash']
      };

      scope.removeRequestConfig = {
        title: 'Remove request',
        classes: ['fa', 'fa-times']
      };
    }
  };
}]);

