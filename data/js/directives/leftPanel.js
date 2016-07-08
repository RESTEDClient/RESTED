'use strict';

angular.module('RestedApp')
.directive('leftPanel', [function() {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/leftPanel.html',
    transclude: true,
    link: function(scope) {
      scope.setLeftPanel = function(tab) {
        scope.activeTab = tab;
      };
    }
  };
}]);

