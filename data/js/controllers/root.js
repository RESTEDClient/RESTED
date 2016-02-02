'use strict';

angular.module('RestedApp')
.controller('RootCtl', ['DEFAULT_REQUEST', 'DEFAULT_SELECTED_COLLECTION', '$rootScope', '$timeout', 'DB', 'Highlight', 'Collection', 'Modal', 'BrowserSync', '$filter',
function(DEFAULT_REQUEST, DEFAULT_SELECTED_COLLECTION, $rootScope, $timeout, DB, Highlight, Collection, Modal, BrowserSync, $filter) {

  $rootScope.request = angular.copy(DEFAULT_REQUEST);
  $rootScope.selectedCollectionIndex = DEFAULT_SELECTED_COLLECTION;
  $rootScope.collections = [];
  $rootScope.urlVariables = [];
  $rootScope.options = {};

  // Set IndexedDBSupport for views
  $rootScope.IDB_SUPPORTED = window.IDB_SUPPORTED;

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
    console.log('collections from IDB', $rootScope.collections);
    /*BrowserSync.get('collections', function(syncData) {
      $rootScope.$apply(function() {
        $rootScope.collections = $filter('orderBy')(syncData.collections || [], 'order');
        console.log('collections from BS', $rootScope.collections);

        // TODO Set indexedDB storage content
      });
    });*/
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
    $rootScope.urlVariables = data && data[0] && data[0].variables ? data[0].variables : [];
    console.log('urls from IDB', $rootScope.urlVariables);
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
    $rootScope.options = data && data[0] && data[0].options ? data[0].options : {};
  }, errorHandler);


  // Called when new urlVariables are added
  $rootScope.newVariable = function() {
    $rootScope.urlVariables.push({
      name: null,
      value: null
    });
  };

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

    $rootScope.options[option] = val;
    DB.options.set({name: 'options', options: $rootScope.options}).then(null, errorHandler);
  };
}]);

