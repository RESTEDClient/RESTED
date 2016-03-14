'use strict';

angular.module('RestedApp')
.factory('RequestUtils', ['PLACEHOLDER_URLS',
function(PLACEHOLDER_URLS) {

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
    // TODO - we no longer use asObject = false
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
          value: headers[key]
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

  /**
   * According to MDN, this makes us more adherent
   * to RFC 3986, which is good, I guess?!
   *
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
   */
  function fixedEncodeURIComponent (str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
  }

  /**
   * Take an array of objects and transform it into
   * a URL encoded form data string suitable to be
   * posted to a server.
   */
  var formDataToFormString = function(formData) {
    if (!formData) {
      return '';
    }

    var result = formData.filter(function(item) {
      return item && item.name;
    }).reduce(function(prev, item, i) {
      return prev + (i !== 0 ? '&' : '') + fixedEncodeURIComponent(item.name) + '=' + (item.value ? fixedEncodeURIComponent(item.value) : '');
    }, '');

    return result.replace(/%20/g, '+');
  };

  /**
   * Take an array of objects and transform it into
   * a string of headers, suitable for being exported
   * to postman json.
   */
  var headersToHeaderString = function(headers) {
    if (!headers) {
      return '';
    }

    var result = headers.filter(function(item) {
      return item && item.name;
    }).reduce(function(prev, item, i) {
      return (prev ? prev + '\n' : '') + item.name + ': ' + (item.value ? item.value : '');
    }, '');

    return result + '\n';
  };

  return {
    reMapHeaders: reMapHeaders,
    randomURL: randomURL,
    formDataToFormString: formDataToFormString,
    headersToHeaderString: headersToHeaderString
  };
}]);

