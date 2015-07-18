'use strict';

angular.module('RestedApp')
.controller('RootCtl', function($scope) {

  // This is an array so we can later
  // extend app with the ability
  // to add more collections.
  $scope.collections = [
    {
      name: 'Collection',
      requests: [
        {
          url: 'www.reddit.com',
          method: 'GET'
        },
        {
          url: 'www.esphen.com',
          method: 'GET'
        }
      ]
    }
  ];

  // This is exposed to lower scopes
  $scope.addRequestToCollection = function(request) {

    if ($scope.collections[0].requests.indexOf(request) === -1) {
      $scope.collections[0].requests.push(request);
    } else {

      // Todo: Replace this with a generic message
      // modal that doesn't look like shit.
      // (Looking at you, alert box)
      alert('Request is already in collection');
    }
  };
});
