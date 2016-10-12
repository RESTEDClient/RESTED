'use strict';

angular.module('RestedApp')
.filter('uuidAssign', function() {

  var createUUID = function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    return (s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4());
  };

  var filter = function(input, type) {
    if (type === 'array') {
      input.map(filter);
    } else if (!input.id) {
      input.id = createUUID();
    }
    return input;
  };

  return filter;
});

