'use strict';

angular.module('RestedApp')
.directive('request', function(Request, RequestUtils) {
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

      scope.headers = [];
      scope.slidden = {};

      var processReturnData = function(response) {
        scope.response = response;
        scope.response.headers = response.headers();
      };

      scope.sendRequest = function() {
        var request = scope.request;
        var headers = {};

        // Strip empty headers and re-map headers to
        // something we can use in $http.
        if (scope.headers) {
          request.headers = RequestUtils.reMapHeaders(scope.headers, true);
        }

        Request.run(request)
          .then(processReturnData, processReturnData);
      };

      scope.addHeader = function() {
        var newHeader = {
          name: '',
          value: ''
        };

        if(!Array.isArray(scope.headers)) {
          scope.headers = [];
        }

        var isAlreadyAdded = scope.headers.some(function(item) {
          return newHeader.name == item.name;
        });

        if(isAlreadyAdded) {
          return;
        }

        scope.headers.push(newHeader);
      };

      scope.addRequest = function(request) {
        if(!request.url) {
          // The non-hiding text for the add button
          // will be fixed when we implement modals.
          alert('Please provide a URL for the request');
          return;
        }

        request.headers = RequestUtils.reMapHeaders(scope.headers, true);
        scope.addToCollection(request);
      };

      scope.slideToggle = function(id) {
        scope.slidden[id] = !scope.slidden[id];
        $('#' + id).slideToggle();
      };

      scope.addRequestConfig = {
        title: 'Add request to collection',
        classes: ['fa', 'fa-plus']
      };

      scope.$watch('request', function(newVal, oldVal) {
        if(newVal && newVal !== oldVal) {
          scope.request = newVal;

          // Map headers from {name: value} => [{name: xxx, value: xxx}]
          // This is so we can mutate them from the template.
          if (scope.request.headers) {
            scope.headers = RequestUtils.reMapHeaders(scope.request.headers);
          } else {
            scope.headers = [];
          }
        }
      });

      scope.getRandomURL = RequestUtils.randomURL;
    }
  };
});
