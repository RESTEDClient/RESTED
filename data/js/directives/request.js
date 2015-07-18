'use strict';

angular.module('RestedApp')
.directive('request', function(PLACEHOLDER_URLS, $http) {
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
          scope.headers.filter(function(header) {
            return header && header.name;
          }).forEach(function(header) {
            headers[header.name] = header.value;
          });

          request.headers = headers;
        }

        // Append http:// if missing
        if(!(/^http:\/\//.test(request.url))) {
          request.url = 'http://' + request.url;
        }

        $http(request)
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

      scope.toggleHeaders = function() {
        scope.showHeaders = !scope.showHeaders;
        $('#headerSlider').slideToggle();
      };

      scope.$watch('request', function(newVal, oldVal) {
        if(newVal && newVal !== oldVal) {
          scope.request = newVal;

          // Map headers from {name: value} => [{name: xxx, value: xxx}]
          // This is so we can mutate them from the template.
          if (scope.request.headers) {
            scope.headers = reMapHeaders(scope.request.headers);
          } else {
            scope.headers = [];
          }
        }
      });

      var reMapHeaders = function(headersAsObject) {
        if(!headersAsObject) {
          return [];
        }

        var headersAsArray = headersAsObject.keys().map(function (key) {
          return {
            name: key,
            value: scope.request.headers[key]
          }
        });

        return headersAsArray;
      };

      // Generate placeholder and cache so we don't over-fetch
      var placeholder;
      scope.getRandomURL = function() {
        if (!placeholder) {
          placeholder = PLACEHOLDER_URLS[Math.floor(Math.random() * PLACEHOLDER_URLS.length)];
        }
        return placeholder;
      }
    }
  };
});
