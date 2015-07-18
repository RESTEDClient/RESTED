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

      // prettyprint handles js and html but not json,
      // here we assume that if it starts with [ or {
      // it is json, and we parse it as such.
      scope.parseJSON = function(body) {
        if(body !== null && (typeof body === 'object' || /^[\[\{]/.test(body))) {
          return JSON.stringify(body, ' ', 2);
        }
        return body;
      };

      scope.slideToggle = function() {
        element.find('.content').slideToggle();
        scope.slidden = !scope.slidden;
      };
    }
  };
});
