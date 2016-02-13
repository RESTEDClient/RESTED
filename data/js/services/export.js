'use strict';

angular.module('RestedApp')
.factory('Export', ['RequestUtils',
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

  function getPostData(entry) {
    if (!entry.data && !entry.formData) {
      return {};
    }

    // If is form data key values, format as urlencoded data
    var urlEncoded = '';
    if (entry.formData) {
      urlEncoded = entry.formData.reduce(function(prev, data) {
        return (prev ? prev + '&' : '') + data.name + '=' + data.value;
      }, '');
    }

    return  {
      'mimeType': urlEncoded ? 'application/x-www-form-urlencoded' : '',
      'params': entry.formData || [],
      'text': urlEncoded ? urlEncoded : entry.data,
    };
  }

  return {
    /**
     * The postman import complies with the format
     * the Chrome extension postman uses for its
     * "download collection" feature. This is to
     * provide an easy migration path for users
     * and help teams cooperate across extensions.
     */
    toPostman: function(dataset) {
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
    toHAR: function(dataset) {
      if (!dataset) {
        return {};
      }

      var har = {
        'log': {
          'entries': []
        }
      };

      dataset.forEach(function(entry) {

        // var entries = har.log.entries;
        // Trim away fluff
        har.log.entries.push({
          'request': {
            'method': entry.method,
            'url': entry.url,
            'headers': entry.headers,
            'postData': getPostData(entry)
          }
        });
      });

      return har;
    }
  };
}]);

