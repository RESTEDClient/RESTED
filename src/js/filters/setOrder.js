'use strict';

angular.module('RestedApp')
.filter('setOrder', function() {
  return function(input) {
    input.forEach(function(item, index) {
      item.order = index;
    });
    return input;
  };
});


