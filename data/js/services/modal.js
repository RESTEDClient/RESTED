'use strict';

angular.module('RestedApp')
.factory('Modal', function($rootScope, $sce) {
  /**
   * Options:
   * {
   *   title: 'The title of the modal',
   *   body: 'The body of the modal',
   *   includeURL: 'An optional template to include inside the modal',
   *   actions: [{ // An optional action button
   *     text: 'The action button text',
   *     click: function action() {}
   *   }]
   * }
   *
   */
  return {
    set: function(options) {

      // Trust body as html (even though it may not be html) so we can
      // interpolate an anchor tag into the throwError method.
      if (options.body) {
        options.body = $sce.trustAsHtml(options.body);
      }
      $rootScope.modalOptions = options;
    },
    remove: function() {
      $rootScope.modalOptions = undefined;
    },
    throwError: function() {
      $rootScope.errorData = '';
      var args = Array.prototype.slice.call(arguments);
      if (Array.isArray(args)) {
        $rootScope.errorData = args.reduce(function(prev, val) {
          return prev + JSON.stringify(val, ' ', 2);
        }, '');
      }

      $rootScope.modalOptions = {
        title: 'Error!',
        body: $sce.trustAsHtml('Sorry, something went wrong.. If there is anything useful in a gray box below, please create an issue on <a href="https://github.com/esphen/RESTED/issues" target="_blank">GitHub</a> with any relevant data you find. Remember to remove any sensitive data beforehand.'),
        includeURL: 'views/fragments/errorField.html'
      };
    }
  };
});

