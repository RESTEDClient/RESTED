'use strict';

angular.module('RestedApp')
.factory('Import', function() {
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
        result.push(request);
      });

      return result;
    },

    /**
     * The HAR import complies with the HAR 1.2
     * spec that can be found here:
     * http://www.softwareishard.com/blog/har-12-spec
     *
     * We don't import everything, as there is a
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
        result.push(entry.request);
      });

      return result;
    }
  };
});

