'use strict';

angular.module('RestedApp')
.controller('RootCtl', ['DEFAULT_REQUEST', 'DEFAULT_SELECTED_COLLECTION', '$rootScope', 'DB', 'Collection', 'Modal', 'BrowserSync', 'Options', 'EasterEgg', '$filter',
function(DEFAULT_REQUEST, DEFAULT_SELECTED_COLLECTION, $rootScope, DB, Collection, Modal, BrowserSync, Options, EasterEgg, $filter) {

  $rootScope.request = angular.copy(DEFAULT_REQUEST);
  $rootScope.selectedCollectionIndex = DEFAULT_SELECTED_COLLECTION;
  $rootScope.collections = [];
  $rootScope.urlVariables = [];
  $rootScope.options = {};

  EasterEgg.print();

  // Fetch options
  //
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

    // Get from sync service and overwrte DB if sync enabled
    BrowserSync.get('options', function(syncData) {
      if (!syncData.options || !syncData.options[0] || !syncData.options[0].options) return;

      $rootScope.$apply(function() {
        // Set data in local store with data from sync
        $rootScope.options = syncData.options[0].options;
        DB.options.set({ name: 'options', options: $rootScope.options });
      });
    });
  }, Modal.errorHandler);

  // Fetch collections
  //
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
      if (!syncData.collections || !syncData.collections[0]) return;

      $rootScope.$apply(function() {
        var collections = syncData.collections;
        $rootScope.collections = $filter('orderBy')(collections, 'order');

        // Set data in local store with data from sync
        DB.collections.replace($rootScope.collections);
      });
    });
  }, Modal.errorHandler);

  // Fetch urlVariables
  //
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
      if (!syncData.urlVariables || !syncData.urlVariables[0] || !syncData.urlVariables[0].variables) return;

      $rootScope.$apply(function() {
        $rootScope.urlVariables = syncData.urlVariables[0].variables

        // Set data in local store with data from sync
        DB.urlVariables.set({ name: 'urlVariables', variables: $rootScope.urlVariables });
      });
    });
  }, Modal.errorHandler);

  // Fetch history
  //
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
    // History intentionally not synced.. Convince me otherwise if you dare
  }, Modal.errorHandler);

  // Called when new urlVariables are added
  $rootScope.newVariable = function() {
    $rootScope.urlVariables.push({
      name: null,
      value: null
    });
  };

  // Add option change handler to rootScope
  $rootScope.setOption = Options.handleOptions;
}]);

