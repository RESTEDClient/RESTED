'use strict';

angular.module('RestedApp')
.directive('leftPanel', ['$rootScope', function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/leftPanel.html',
    link: function(scope) {
      scope.setLeftPanel = function(tab) {
        // Persist in db
        $rootScope.setOption('activeTab', tab);
      };
    }
  };
}]);

