'use strict';

var module = angular.module('RestedApp');

// Used to have the ability to migrate users
// if we change the db schema. When a connection
// to indexedDB is opened with a higher version,
// there will be an onupgradeneeded event called
// which we can use to convert users on older
// paradigms to the current one.
module.constant('DB_VERSION', 2);

// The name of our entire indexedDB instance.
module.constant('DB_NAME', 'RESTED');

// The name of the "table" in indexedDB we use for
// our collections.
module.constant('DB_OBJECT_STORE_NAME', 'collections');

// This is the request used to initialize the
// request panel. This can be either on
// application load or on request reset.
module.constant('DEFAULT_REQUEST', {
  method: 'GET',
  headers: {}
});
