'use strict';

angular.module('RestedApp')
.factory('RequestUtils', function(PLACEHOLDER_URLS) {

  /**
   * Translates data from the way we can use it
   * effectively, to the way $http takes data
   * (and back again).
   *
   * If asObject is falsey, the method will take
   * an object and return an array of objects.
   * If asObject is truthy, it takes an array of
   * objects and returns an object.
   *
   * The two methods look like this:
   * Object:
   * {
   *   headerName: value
   * }
   *
   * Array:
   * [
   *   {
   *     headerName: headerName,
   *     value: value
   *   }
   * ]
   */
  var reMapHeaders = function(headers, asObject) {
    if(!headers && !asObject) {
      return [];
    } else if(!headers && asObject) {
      return {};
    }

    if(asObject) {
      var headersAsObject = {};
      headers.filter(function(header) {
        return header && header.name;
      }).forEach(function(header) {
        headersAsObject[header.name] = header.value;
      });

      return headersAsObject;
    } else {
      var headersAsArray = Object.keys(headers).map(function(key) {
        return {
          name: key,
          value: scope.request.headers[key]
        }
      });

      return headersAsArray;
    }
  };

  /**
  * Generate random placeholder URL and cache it so we don't fetch every digest.
  */
  var placeholder;
  var randomURL = function() {
    if (!placeholder) {
      placeholder = PLACEHOLDER_URLS[Math.floor(Math.random() * PLACEHOLDER_URLS.length)];
    }
    return placeholder;
  };


  return {
    reMapHeaders: reMapHeaders,
    randomURL: randomURL
  };
});
