'use strict';

angular.module('RestedApp')
.factory('Import', function() {
  return {
    /**
     * The postman import complies with the format
     * the Chrome extension postman uses for its
     * "download collection" feature. This is to
     * provide an easy migration path for users
     * and help teams cooperate across extensions.
     */
    fromPostman: function() { console.log('TODO') },

    /**
     * The HAR import complies with the HAR 1.2
     * spec that can be found here:
     * http://www.softwareishard.com/blog/har-12-spec
     *
     * We don't import everything, as there is a
     * fair bit of fluff that is not needed to
     * archive a request to a collection.
     */
    fromHAR: function() { console.log('TODO') }
  };
});

