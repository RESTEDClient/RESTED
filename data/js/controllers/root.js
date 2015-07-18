'use strict';

angular.module('RestedApp')
.controller('RootCtl', function($scope, Collections) {

  // This is saved in the db like this:
  //  [
  //   {
  //     name: 'Collection',
  //     requests: [
  //       {
  //         url: 'www.reddit.com',
  //         method: 'GET'
  //       },
  //       {
  //         url: 'www.vg.no',
  //         method: 'GET'
  //       }
  //     ]
  //   }
  // ]
  // This is an array so we can easily
  // extend app with the ability
  // to add more collections later.
  Collections.get().then(function(data) {
    $scope.collections = data;
    console.log('collections', data);
  });

  // This is exposed to lower scopes
  $scope.addRequestToCollection = function(request) {
    console.log('Adding request:', request);

    // Create new collection
    if (!$scope.collections[0]) {
      $scope.collections.push({
        name: 'Collection',
        requests: [request]
      });

      Collections.add($scope.collections[0]);
    } else if ($scope.collections[0].requests.indexOf(request) === -1) {
      $scope.collections[0].requests.push(request);

      console.log('collection is now', $scope.collections[0]);
      Collections.set($scope.collections[0]);
    } else {

      // Todo: Replace this with a generic message
      // modal that doesn't look like shit.
      // (Looking at you, alert box)
      alert('Request is already in collection');
    }
  };
});
