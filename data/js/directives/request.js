'use strict';

angular.module('RestedApp')
.directive('request', function($http) {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/request.html',
    scope: {
      request: '=',
      addToCollection: '&'
    },
    link: function(scope, element, attrs, controllers) {
      scope.options = {
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'JSONP']
      };

      var processReturnData = function(response) {
        scope.response = response;
        scope.headers = response.headers();
      };

      scope.sendRequest = function() {
        $http(scope.request)
          .then(processReturnData, processReturnData);
      };

      scope.$watch('request', function(newVal, oldVal) {
        if(newVal && newVal !== oldVal) {
          scope.request = newVal;
        }
      });
    }
  };
});
