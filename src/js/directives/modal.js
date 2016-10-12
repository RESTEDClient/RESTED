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
        if(newVal) {
          element.find('.modal').modal('show');

          // Focus OK button after fade-in so user can press Enter
          setTimeout(function() {
            element.find('#modalAction').focus();
          }, 500);
        } else {
          element.find('.modal').modal('hide');
        }
      });
    }
  }
});

