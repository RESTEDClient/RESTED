'use strict';

angular.module('RestedApp')
.directive('slideyButton', function() {

  var animate = {
    in: {
      'left': 0
    },
    out: {
      'left': 250
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
      onClick: '&'
    },
    link: function(scope, element) {

      // If user hovers over the component for waitTime
      // milliseconds, show the text. Hide on mouse out.
      scope.$watch('isOver', function(isOver, oldVal) {
        if (isOver === oldVal) {
          return;
        }

        var $text = element.find('.slidey-text');

        if(isOver) {
          setTimeout(function() {
            if(scope.isOver) {
              $text.animate(animate.in, animate.options);
            }
          }, waitTime);
        } else {
          $text.animate(animate.out, animate.options);
        }
      });
    }
  };
});

