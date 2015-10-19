'use strict';

var module = angular.module('RestedApp');

// Used to have the ability to migrate users
// if we change the db schema. When a connection
// to indexedDB is opened with a higher version,
// there will be an onupgradeneeded event called
// which we can use to convert users on older
// paradigms to the current one.
module.constant('DB_VERSION', 4);

// The name of our entire indexedDB instance.
module.constant('DB_NAME', 'RESTED');

// The name of the "table" in indexedDB we use for
// our collections.
module.constant('DB_OBJECT_STORE_NAME', 'collections');

// The name of the "table" in indexedDB we use for
// our URL variables.
module.constant('DB_URL_VARIABLES_STORE_NAME', 'urlVariables');

// The name of the "table" in indexedDB we use for
// storing application options
module.constant('DB_OPTIONS_STORE_NAME', 'options');

// This is the index of the selected collection
// group on load of the application. This is the
// collection that groups will be added to if a
// different collection is not specified by the
// user.
module.constant('DEFAULT_SELECTED_COLLECTION', 0);

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

// These are the themes available on bootswatch,
// alphabethic order - except application default
// (yeti) first, then bootstrap default (retro).
//
// TODO: There are some themes (Black backgrounds)
// that simply DO NOT work with the logo. We need
// to figure out something if we want to add them
// back in. (Make logo white?)
module.constant('THEMES', [
  'yeti',
  'retro',
  'cerulean',
  'cosmo',
  //'cyborg',
  //'darkly',
  'flatly',
  'journal',
  'lumen',
  'paper',
  'readable',
  'sandstone',
  'simplex',
  //'slate',
  'spacelab',
  'superhero',
  'united'
]);

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
  'http://www.lingscars.com/',
  'http://bojackhorseman.com',
  'http://visitnorway.com',
]);

