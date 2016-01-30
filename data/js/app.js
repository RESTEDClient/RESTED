'use strict';

// Register app
angular.module('RestedApp', ['dndLists']);

// Prevent double-bootstrap by storing
// bootstrap status.
var isBootstrapped = false;

var dbTestName = '_RESTED_TEST_IDB_SUPPORT' + (Math.random() * 10000);

// We have to delay the entire
// bootstrapping of the app until we
// know of the client supports
// indexeddb because of how firefox
// handles private mode.
function bootstrapApp(doesSupportIDB) {
  if (!isBootstrapped) {
    window.IDB_SUPPORTED = doesSupportIDB;

    var app = angular.element('#app');
    angular.bootstrap(app, ['RestedApp']);
    isBootstrapped = true;

    if (doesSupportIDB) {
      (window.indexedDB || window.mozIndexedDB).deleteDatabase(dbTestName);
    }
  }
}

function checkIDBSupportAndCallManualBootstrap() {
  try {
    var indexedDB = window.indexedDB || window.mozIndexedDB;

    // In Firefox private mode, this will throw
    // an error because IndexedDB is only read,
    // not write.
    var test = indexedDB.open(dbTestName, 1);

    // Check if we successfully created test DB
    test.onerror = function() {
      bootstrapApp(false);
    }
    test.onsuccess = function() {
      bootstrapApp(true);
    }
  } catch(e) {
    // Run async to allow controllers to register
    setTimeout(function() {
      bootstrapApp(false);
    });
  }
};

// Done setting up, check for support and bootstrap
checkIDBSupportAndCallManualBootstrap();

