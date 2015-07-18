'use strict';

angular.module('RestedApp')
.directive('collections', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/collections.html',
    scope: {},
    link: function(scope, element, attrs, controllers) {

      // This is an array so we can later
      // extend ability to add more collections
      scope.collections = [
        {
          name: 'Collection',
          requests: [
            {
              url: 'www.reddit.com',
              method: 'GET'
            },
            {
              url: 'www.esphen.com',
              method: 'GET'
            }
          ]
        }
      ];


    }
  }
});
