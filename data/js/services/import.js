'use strict';

angular.module('RestedApp')
.factory('Import', ['RequestUtils',
function(RequestUtils) {
  var stringHeadersToObject = function(string) {
    var result = [];

    string.split('\n').forEach(function(line) {
      if (!line) {
        return;
      }

      var header = line.split(': ');
      result.push({
        name: header[0],
        value: header[1]
      });
    });

    return result;
  };

  return {
    /**
     * The postman import complies with the format
     * the Chrome extension postman uses for its
     * "download collection" feature. This is to
     * provide an easy migration path for users
     * and help teams cooperate across extensions.
     */
    fromPostman: function(json) {
      if (!json) {
        return {};
      }

      var entries = json.requests;
      var result  = [];

      entries.forEach(function(request) {
        request.headers = stringHeadersToObject(request.headers);

        if (Array.isArray(request.data)) {
          request.data = RequestUtils.formDataToFormString(request.data.map(function(data) {
            return { name: data.key, value: data.value};
          }));
        }

        // Trim away fluff
        result.push({
          'method': request.method,
          'url': request.url,
          'headers': request.headers,
          'data': request.data
        });
      });

      return result;
    },

    /**
     * The HAR import complies with the HAR 1.2
     * spec that can be found here:
     * http://www.softwareishard.com/blog/har-12-spec
     *
     * We don't use everything, as there is a
     * fair bit of fluff that is not needed to
     * archive a request to a collection.
     */
    fromHAR: function(har) {
      if (!har) {
        return {};
      }

      var entries = har.log.entries;
      var result  = [];

      entries.forEach(function(entry) {

        // Trim away fluff
        result.push({
          'method': entry.request.method,
          'url': entry.request.url,
          'headers': entry.request.headers,
          'data': entry.request.postData.text
        });
      });

      return result;
    }
  };
}]);

