'use strict';

angular.module('RestedApp')
.factory('Request', function($http) {

  /**
  * Prepend http:// if missing from url
  */
  var prependHttp = function(url) {
    if(!(/^http:\/\//.test(url))) {
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
    }).replace(/\/{2,}/g, "/");
  };

  return {
    run: function(request) {
      var url = prependHttp(request.url);
      url = mapParameters(url, request.parameters);

      request.url = url;
      return $http(request);
    }
  };
});
