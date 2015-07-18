'use strict';

angular.module('RestedApp')
.directive('request', function($http) {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/request.html',
    scope: {
      request: '='
    },
    link: function(scope, element, attrs, controllers) {
      scope.options = {
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'JSONP']
      };

      // Set defaults
      scope.request = {
        method: scope.options.methods[0],
        url: 'http://www.vg.no',
        headers: {'Test-Header': 'hello'}
      };

      var processReturnData = function(response) {
        console.log(response);
        scope.response = response;
        scope.headers = response.headers();
      };

      scope.sendRequest = function() {
        $http(scope.request)
          .then(processReturnData, processReturnData);
      };

      scope.$watch('request', function(newVal, oldVal) {
        console.log('recieved Request:', newVal);
        if(newVal && newVal !== oldVal) {
          console.log('Request set to:', newVal);
          scope.request = newVal;
        }
      });
    }
  };
});
