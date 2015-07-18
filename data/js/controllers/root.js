'use strict';

angular.module('RestedApp')
.controller('RootCtl', function(DEFAULT_REQUEST, $scope, Collections) {

  $scope.request = DEFAULT_REQUEST;

  var errorHandler = function(event) {
    console.error(event);
    alert(event.message);
  };

  // This is saved in the db like this:
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
  Collections.get().then(function(data) {
    $scope.collections = data;
  }, errorHandler);

  // This is exposed to lower scopes
  $scope.addRequestToCollection = function(request) {

    // Create new collection if none exist
    if (!$scope.collections[0]) {
      $scope.collections.push({
        name: 'Collection',
        requests: [request]
      });

      Collections.add($scope.collections[0]).then(null, errorHandler);
    } else if ($scope.collections[0].requests.indexOf(request) === -1) {
      $scope.collections[0].requests.push(request);

      Collections.set($scope.collections[0]).then(null, errorHandler);
    } else {

      // Todo: Replace this with a generic message
      // modal that doesn't look like shit.
      // (Looking at you, alert box)
      alert('Request is already in collection');
    }
  };

  // This is exposed to lower scopes
  $scope.removeRequestFromCollection = function(request) {
    $scope.collections[0].requests = $scope.collections[0].requests.filter(function(item) {
      return item.url !== request.url;
    });

    Collections.set($scope.collections[0]).then(null, errorHandler);
  };
});
