'use strict';

angular.module('RestedApp')
.controller('RootCtl', function($scope) {
  // This is an array so we can later
  // extend ability to add more collections
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
    $scope.collections[0].requests.push(request);
  };
});
