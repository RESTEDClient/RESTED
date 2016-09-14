'use strict';

angular.module('RestedApp')
.controller('RootCtl', ['DEFAULT_REQUEST', 'DEFAULT_SELECTED_COLLECTION', '$rootScope', '$timeout', 'DB', 'Highlight', 'Collection', 'Modal', 'BrowserSync', 'EasterEgg', '$filter',
function(DEFAULT_REQUEST, DEFAULT_SELECTED_COLLECTION, $rootScope, $timeout, DB, Highlight, Collection, Modal, BrowserSync, EasterEgg, $filter) {

  $rootScope.request = angular.copy(DEFAULT_REQUEST);
  $rootScope.selectedCollectionIndex = DEFAULT_SELECTED_COLLECTION;
  $rootScope.collections = [];
  $rootScope.urlVariables = [];
  $rootScope.options = {};

  EasterEgg.print();

  var errorHandler = Modal.errorHandler;
  // Data is saved in the db like so:
  //  [
  //   {
  //     name: 'Collection',
  //     order: 2,
  //     id: 'some-UUID',
  //     minimized: true
  //     requests: [
  //       {
  //         id: 'some-UUID',
  //         url: 'www.vg.no',
  //         method: 'POST',
  //         data: '',
  //         useFormData: true,
  //         formData: [
  //           {
  //             name: 'BodyOfPOST...',
  //             value: '...SentViaFormData'
  //           }
  //         ],
  //         headers: [
  //          {
  //            name: 'Content-Type',
  //            value: 'angular/awesomeness'
  //          }
  //         ]
  //       }
  //     ]
  //   }
  // ]
  DB.collections.get().then(function(data) {
    $rootScope.collections = $filter('orderBy')(data, 'order');

    // Get from sync service and overwrte DB if sync enabled
    BrowserSync.get('collections', function(syncData) {
      console.log('syncData coll', syncData);
      $rootScope.$apply(function() {
        $rootScope.collections = $filter('orderBy')(syncData.collections || [], 'order');

        // Set data in local store with data from sync
        DB.collections.set(syncData);
      });
    });
  }, errorHandler);

  // Data is saved in db like so:
  //  [
  //   {
  //     name: 'urlVariables',
  //     variables: [
  //       {
  //         name: 'TLD',
  //         value: '.no'
  //       }
  //     ]
  //   }
  // ]
  DB.urlVariables.get().then(function(data) {
    // Defensive programming ftw
    $rootScope.urlVariables = data && data[0] && data[0].variables
      ? data[0].variables
      : [];

    // Get from sync service and overwrte DB if sync enabled
    BrowserSync.get('urlVariables', function(syncData) {
      $rootScope.$apply(function() {
        console.log('syncData urlVariables', syncData, urlVariables);
        $rootScope.urlVariables = syncData && syncData[0] && syncData[0].variables
          ? data[0].variables
          : [];
        $rootScope.url = $filter('orderBy')(syncData.collections || [], 'order');

        // Set data in local store with data from sync
        DB.collections.set(syncData);
      });
    });
  }, errorHandler);

  // Data is saved in db like so:
  //  [
  //   {
  //     name: 'options',
  //     options: {
  //       key: 'value'
  //     }
  //   }
  // ]
  DB.options.get().then(function(data) {
    $rootScope.options = data && data[0] && data[0].options
      ? data[0].options
      : {};
  }, errorHandler);

  // Data is saved in the db like so:
  //  [
  //   {
  //     name: 'history',
  //     requests: [
  //       {
  //         id: 'some-UUID',
  //         url: 'www.vg.no',
  //         method: 'POST',
  //         data: '',
  //         useFormData: true,
  //         formData: [
  //           {
  //             name: 'BodyOfPOST...',
  //             value: '...SentViaFormData'
  //           }
  //         ],
  //         headers: [
  //          {
  //            name: 'Content-Type',
  //            value: 'angular/awesomeness'
  //          }
  //         ]
  //       }
  //     ]
  //   }
  // ]
  DB.history.get().then(function(data) {
    $rootScope.history = data && data[0] && data[0].requests ? data[0].requests : [];
  }, errorHandler);

  // Called when new urlVariables are added
  $rootScope.newVariable = function() {
    $rootScope.urlVariables.push({
      name: null,
      value: null
    });
  };

  // Handle application options changing
  $rootScope.setOption = function(option, val) {
    $rootScope.$broadcast(option + '-change', val);

    // If we are changing style or turning styling on
    if (option === 'highlightStyle' || (option === 'disableHighlighting' && val === false)) {
      // For performance reasons, we close the response when changing style.
      // This is because if we change styles mid-flight, it can cause the
      // browser to become really undesponsive.

      // Wait for request directive to remove response
      $timeout(function() {
        // Redraw highlight styles
        Highlight.highlightAll();
      });
    }

    // If we are changing the sync settings, we need to update the sync store
    if (option === 'sync') {

      // You shouldn't be here! Get out!
      if (!chrome.storage.sync) {
        $rootScope.options.sync = false;
        return;
      }

      // Sync turned on, query user for what to do next
      if (val === true) {
        function onUpdate() {
          $rootScope.$apply(function() {
            if (chrome.runtime.lastError) {
              Modal.throwError('An error occured when reading/writing the browser sync storage\n', chrome.runtime.lastError)
              return;
            }

            Modal.remove();
          });
        }

        Modal.set({
          title: 'Activating browser sync',
          body: 'Activating this feature will start syncing all your local data across the internet to the other devices where you have turned this feature on. ' +
          'If you want to keep your local data, then RESTED will have to overwrite the remote sync server data. Otherwise, overwrite the local data with the remote ' +
          'server\'s sync data.',
          actions: [{
            text: 'Overwrite local',
            click: function() {
              chrome.storage.sync.get(function(data) {
                console.log('Copying data into local storage', data);

                // Clear the local storage so we don't get weird inconsistensies
                // when remote stores are empty
                chrome.storage.local.clear(function() {
                  chrome.storage.local.set(data, onUpdate);

                  // Completely clean state by reloading
                  location.reload();
                });
              });
            }
          }, {
            text: 'Overwrite remote',
            click: function() {
              chrome.storage.local.get(function(data) {
                console.log('Copying data into sync storage', data);
                chrome.storage.sync.set(data, onUpdate);
              });
            }
          }],
          cancelClick: function() {
            // User refused. Turn off sync
            $rootScope.options.sync = false;
            DB.options.set({name: 'options', options: $rootScope.options})
              .then(null, errorHandler);
          }
        });
      }

      // We do not clear the sync store on incoming false value, as a user might
      // want to disable the sync on one of his/her machines without losing all
      // of the data. Clearing the sync store has to be a manual user action.
    }

    $rootScope.options[option] = val;
    DB.options.set({name: 'options', options: $rootScope.options})
      .then(null, errorHandler);
  };
}]);

