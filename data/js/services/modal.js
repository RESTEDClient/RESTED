'use strict';

angular.module('RestedApp')
.factory('Modal', function($rootScope) {
  return {
    set: function(options) {
      $rootScope.modalOptions = options;
    },
    remove: function() {
      $rootScope.modalOptions = undefined;
    }
  };
});
