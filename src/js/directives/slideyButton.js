'use strict';

angular.module('RestedApp')
.directive('slideyButton', function() {

  var animate = {
    out: {
      'width': '0px',
      'opacity': 0
    },
    options: {
      queue: false
    }
  };

  var waitTime = 450;

  return {
    restricted: 'E',
    templateUrl: 'views/directives/slideyButton.html',
    scope: {
      config: '=',
      clickEvent: '&'
    },
    link: function(scope, element) {

      // If user hovers over the component for waitTime
      // milliseconds, show the text. Hide on mouse out.
      scope.$watch('isOver', function(isOver, oldVal) {
        if (isOver === oldVal) {
          return;
        }

        var $text = element.find('.slidey-wrapper');

        if(isOver) {
          setTimeout(function() {
            if(scope.isOver) {
              var toState = {
                width: $text.find('.slidey-text').width(),
                opacity: 1
              };

              $text.animate(toState, animate.options);
            }
          }, waitTime);
        } else {
          $text.animate(animate.out, animate.options);
        }
      });
    }
  };
});

