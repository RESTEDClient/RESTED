'use strict';

angular.module('RestedApp')
.controller('RootCtl', function(DEFAULT_REQUEST, $rootScope, DB, Modal) {

  $rootScope.request = angular.copy(DEFAULT_REQUEST);
  $rootScope.collections = [];
  $rootScope.urlVariables = [];

  var errorHandler = function(event) {
    Modal.throwError('An error occured when reading/writing to indexedDB: ', event);
  };

  // Data is saved in the db like so:
  //  [
  //   {
  //     name: 'Collection',
  //     requests: [
  //       {
  //         url: 'www.vg.no',
  //         headers: [
  //          {
  //            name: 'Content-Type',
  //            value: 'angular/awesomeness'
  //          }
  //         ],
  //         method: 'GET'
  //       }
  //     ]
  //   }
  // ]
  // Root node is an array so we
  // can easily extend app with the ability
  // to add more collections later.
  DB.collections.get().then(function(data) {
    $rootScope.collections = data;
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
  }, errorHandler);

  // Called on request addition
  // This is exposed to lower scopes
  $rootScope.addRequestToCollection = function(request) {

    // Create new collection if none exist
    if (!$rootScope.collections[0]) {
      $rootScope.collections.push({
        name: 'Collection',
        requests: [request]
      });

      DB.collections.add($rootScope.collections[0]).then(null, errorHandler);
    } else if ($rootScope.collections[0].requests.indexOf(request) === -1) {
      $rootScope.collections[0].requests.push(request);

      DB.collections.set($rootScope.collections[0]).then(null, errorHandler);
    } else {
      Modal.set({
        title: 'Hey!',
        body: 'Request is already in collection. Overwrite existing entry?',
        actions: [{
          text: 'Overwrite',
          click: function() {
            DB.collections.set($rootScope.collections[0]).then(null, errorHandler);
            Modal.remove();
          }
        }, {
          text: 'Save',
          click: function() {
            DB.collections.get().then(function(data) {
              var unalteredCollections = data[0];

              if (unalteredCollections && unalteredCollections.requests) {
                unalteredCollections.requests.push(request);
                DB.collections.set(unalteredCollections).then(null, errorHandler);
                Modal.remove();
              } else {
                Modal.throwError('Sorry, something went wrong! Unaltered collections: ', unalteredCollections);
              }
            }, errorHandler);
          }
        }]
      });
    }
  };

  // Called on request removal
  // This is exposed to lower scopes
  $rootScope.removeRequestFromCollection = function(request) {
    Modal.set({
      title: 'Confirm deletion',
      body: 'Please confirm you wish to remove this request from your saved collection',
      actions: [{
        text: 'Confirm',
        click: function() {
          $rootScope.collections[0].requests = $rootScope.collections[0].requests.filter(function(item) {
            return item.url !== request.url;
          });

          DB.collections.set($rootScope.collections[0]).then(null, errorHandler);
          Modal.remove();
        }
      }]
    });
  };


  // Called when new urlVariables are added
  $rootScope.newVariable = function() {
    $rootScope.urlVariables.push({
      name: null,
      value: null
    });
  };
});

