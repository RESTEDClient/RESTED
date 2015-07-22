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

  return {
    restricted: 'E',
    templateUrl: 'views/directives/slideyButton.html',
    scope: {
      config: '=',
      onClick: '&'
    },
    link: function(scope, element) {

      var gracePeriod = false;
      scope.$watch('isOver', function(isOver, oldVal) {
        if (isOver === oldVal) {
          return;
        }

        var $text = element.find('.slidey-text');

        isOver
          ? $text.animate(animate.in, animate.options)
          : $text.animate(animate.out, animate.options);
      });
    }
  };
});

