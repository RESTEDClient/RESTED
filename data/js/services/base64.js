'use strict';

angular.module('RestedApp')
.factory('Base64', function(Modal) {

  return {
    encode: function(str) {
      /*
       * This pattern is to prevent Character out of range
       * exceptions when input unicode strings.
       * See following article by Johan Sundström:
       *
       * http://ecmanaut.blogspot.no/2006/07/encoding-decoding-utf8-in-javascript.html
       */
      return window.btoa(unescape(encodeURIComponent(str)));
    }
  }
});

