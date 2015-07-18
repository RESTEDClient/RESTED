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

      var processReturnData = function(data, status, headers, config) {
        scope.response = data;
        scope.headers = data.headers();
      };

      scope.sendRequest = function() {
        $http(scope.request)
          .then(processReturnData, processReturnData);
      };

      scope.parseJSON = function(json) {
        return JSON.stringify(json, ' ', 2);
      };

      // Holds elements which have been animated with slideToggle
      scope.slidden = {};

      scope.slideToggle = function(id) {
        scope.slidden[id] = !scope.slidden[id];
        var $item = $('#' + id);
        $item.slideToggle();
      };
    }
  };
});
