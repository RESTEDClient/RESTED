'use strict';

/**
 * This service uses the browser.storage.sync API to
 * store requested data in Chrome or Firefox sync.
 *
 * With this service you should always be able to
 * assume that BrowserSync is enabled and supported,
 * as all checks agains this will be done here.
 */
angular.module('RestedApp')
.factory('BrowserSync', ['$rootScope', 'Modal',
function($rootScope, Modal) {
  /**
   * Spread operator requires CH 46, OP 33
   */
  function handleErrorsAndCallCallback(callback) {
    if (chrome.runtime.lastError) {
      Modal.throwError('An error occured when reading/writing the browser sync storage\n', chrome.runtime.lastError)
      return;
    }

    if (arguments.length <= 1) return;

    var args = [].slice.call(arguments, 1);
    callback(...args);
  }
  return {
    /**
     * Pass null as name to get all data
     */
    get: function(name, callback) {
      // TODO Check for support of chrome.storage.sync (Opera does not supp)
      // TODO check options to see if it is enabled
      chrome.storage.sync.get(name, handleErrorsAndCallCallback.bind(this, callback));
    },
    sizeOf: function() {},
    set: function(name, data, callback) {
      if (!name) {
        console.log('No name was passed to BrowserSync.set');
        return null;
      } else if ($rootScope.options.sync !== true) {
        return null;
      }

      console.log('set', name, data);

      // TODO Add failure callback?
      // TODO Check for support of chrome.storage.sync (Opera does not supp)
      // TODO check options to see if it is enabled
      // TODO options panel: When enabled, have question "Add to sync or replace"
      // TODO check for chrome.runtime.lastError
      var keyValue = {};
      keyValue[name] = data;
      chrome.storage.sync.set(keyValue, handleErrorsAndCallCallback.bind(this, callback));
    },
    clear: function(callback) {
      Modal.set({
        title: 'Clear synced storage?',
        body: 'Are you sure you would like to clear the browser\'s synced ' +
          'data? This will clear data on all devices with sync enabled.',
        actions: [{
          text: 'Clear sync',
          click: function action() {
            chrome.storage.clear(handleErrorsAndCallCallback.bind(this, callback));
          }
        }]
      });
    }
  };
}])
