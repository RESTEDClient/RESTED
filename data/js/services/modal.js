'use strict';

angular.module('RestedApp')
.factory('Modal', function($rootScope) {
  /**
   * Options:
   * {
   *   title: 'The title of the modal',
   *   body: 'The body of the modal',
   *   includeURL: 'An optional template to include inside the modal',
   *   action: { // An optional action button
   *     text: 'The action button text',
   *     click: function action() {}
   *   }
   * }
   *
   */
  return {
    set: function(options) {
      $rootScope.modalOptions = options;
    },
    remove: function() {
      $rootScope.modalOptions = undefined;
    }
  };
});
