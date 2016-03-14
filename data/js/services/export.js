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

  function addPostmanDataAttributes(postData) {
    if (!postData) {
      return [];
    }

    return postData.map(function(data) {
      return {
        key: data.name,
        value: data.value,
        type: 'text',
        enabled: true,
      };
    });
  }

  return {
    /**
     * The postman export complies with the format
     * the Chrome extension postman uses for its
     * "download collection" feature. This is to
     * provide an easy migration path for users
     * and help teams cooperate across extensions.
     *
     * Postman adds some extra fluff that we need
     * to pad the exported data with. We pick it
     * from the selected collection.
     */
    toPostman: function(dataset, collection) {
      if (!dataset) {
        return {};
      }

      var postmanJson = {
        'id': collection.id,
        'name': collection.name,
        'requests': [],
      };

      dataset.forEach(function(request) {
        if (request.formData) {
          postmanJson.requests.push({
            'id': request.id,
            'collectionId': collection.id,
            'method': request.method,
            'url': request.url,
            'headers': RequestUtils.headersToHeaderString(request.headers),
            'dataMode': 'params',
            'data': addPostmanDataAttributes(request.formData),
            'rawModeData': [],
          });
        } else {
          postmanJson.requests.push({
            'id': request.id,
            'collectionId': collection.id,
            'method': request.method,
            'url': request.url,
            'headers': RequestUtils.headersToHeaderString(request.headers),
            'data': [],
            'dataMode': 'raw',
            'rawModeData': request.data || [],
          });
        }
      });

      return postmanJson;
    },

    /**
     * The HAR export should comply with the HAR 1.2
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
          'version': '1.2',
          'creator': 'RESTED REST Client',
          'Comment': 'An exported collection from RESTED',
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

