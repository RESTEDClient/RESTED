'use strict';

angular.module('RestedApp')
.factory('Request', function($http) {

  /**
  * Prepend http:// if missing from url
  */
  var prependHttp = function(url) {
    if(!(/^https?:\/\//.test(url))) {
      url = 'http://' + url;
    }
    return url;
  };

  /**
  * Takes an url in the form of site.com/{{key}} and
  * maps the key up against a variable in the params
  * object. It then returns the complete URL.
  *
  * The function also collapses {{key}} to nothing
  * if key is missing, and removes any double slashes
  * left behind.
  */
  var mapParameters = function(url, params) {
    return url.replace(/\{\{(\w+)\}\}/g, function(match, capture) {
      var param = params ? params[capture] : null;
      return param ? param : '';
    }).replace(/([^:]\/)\/+/g, '$1');
  };

  return {
    run: function(request, parameters) {
      var requestCopy = angular.copy(request);
      var url = prependHttp(requestCopy.url);
      url = mapParameters(url, parameters);

      requestCopy.url = url;
      return $http(requestCopy);
    }
  };
});
