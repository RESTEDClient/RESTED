'use strict';

angular.module('RestedApp')
.factory('Highlight', ['$rootScope',
function($rootScope) {
  return {
    highlightAll: function() {
      console.log($rootScope.options.disableHighlighting);
      if (!$rootScope.options.disableHighlighting) {
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block);
        });
      }
    }
  };
}]);

