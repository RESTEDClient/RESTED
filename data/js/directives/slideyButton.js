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
      scope.$watch('isOver', function(isOver) {
        var $text = element.find('.slidey-text');
        console.log(isOver);
        isOver
          ? $text.animate(animate.in, animate.options)
          : $text.animate(animate.out, animate.options);
      });
    }
  };
});

