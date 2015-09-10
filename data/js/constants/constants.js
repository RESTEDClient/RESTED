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
  headers: [{
    name: '',
    value: ''
  }],
  cache: false
});

// The milliseconds we delay showing spinners
// after a request has been sent.
module.constant('SPINNER_SHOW_DELAY', 300);

// The URLs shown in the URL bar on load.
// Add more if you want!
// The only rule for these: Nothing NSFW or illegal
// and is should preferably be something amusing!
module.constant('PLACEHOLDER_URLS', [
  // Comics
  'http://xkcd.com/323/',
  'http://cube-drone.com/comics/c/severity-one',
  'http://www.phdcomics.com/comics/archive.php?comicid=946',
  // Useful sites
  'http://news.ycombinator.com/',
  'http://reddit.com',
  // Random fun stuff
  'http://www.aperturescience.com',
  'http://www.pennyjuice.com/htmlversion/whoispj.htm',
  'http://www.arngren.net/',
  'http://bojackhorseman.com',
  'http://visitnorway.com',
]);

