'use strict';

var module = angular.module('RestedApp');

// Used to have the ability to migrate users
// if we change the db schema. When a connection
// to indexedDB is opened with a higher version,
// there will be an onupgradeneeded event called
// which we can use to convert users on older
// paradigms to the current one.
module.constant('DB_VERSION', 3);

// The name of our entire indexedDB instance.
module.constant('DB_NAME', 'RESTED');

// The name of the "table" in indexedDB we use for
// our collections.
module.constant('DB_OBJECT_STORE_NAME', 'collections');

// The name of the "table" in indexedDB we use for
// our URL variables.
module.constant('DB_URL_VARIABLES_STORE_NAME', 'urlVariables');

// This is the request used to initialize the
// request panel. This can be either on
// application load or on request reset.
module.constant('DEFAULT_REQUEST', {
  method: 'GET',
  headers: {}
});

module.constant('PLACEHOLDER_URLS', [
  'http://google.com',
  'http://bojackhorseman.com',
  'http://reddit.com',
  'http://visitnorway.com',
  'http://www.aperturescience.com',
  'http://www.pennyjuice.com/htmlversion/whoispj.htm',
  'http://www.arngren.net/',
  'http://bing.com'
]);
