'use strict';

angular.module('RestedApp')
.directive('modal', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/modal.html',
    scope: {
      options: '='
    },
    link: function(scope, element) {
      scope.$watch('options', function(newVal, oldVal) {
        if(newVal === oldVal) {
          return;
        }

        if(newVal) {
          element.find(".modal").modal('show');
        } else {
          element.find(".modal").modal('hide');
        }
      });
    }
  }
});
