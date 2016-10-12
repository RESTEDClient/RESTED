'use strict';

angular.module('RestedApp')
.directive('contentSlider', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/contentSlider.html',
    scope: {
      title: '@',
      content: '=',
      startHidden: '='
    },
    link: function(scope, element, attrs, controllers) {
      scope.slidden = !scope.startHidden;

      scope.slideToggle = function() {
        element.find('.content').slideToggle();
        scope.slidden = !scope.slidden;
      };
    }
  };
});

