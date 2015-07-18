'use strict';

angular.module('RestedApp')
.filter('status', function () {
  return function (status) {
    if(status >= 200 && status < 300) {
      return 'green';
    } else if (status >= 500 && status < 600) {
      return 'red';
    } else {
      return 'teal';
    }
  }
});
