'use strict';

var app = angular.module('RestedApp', []);

app.config(['$httpProvider', function($httpProvider) {
  console.log($httpProvider);
  //$httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  /*$httpProvider.defaults.headers.options = {
      'Access-Control-Allow-Origin': '*',
      'Test-header': 'YES!'
  };
  $httpProvider.defaults.headers.common['Test-Header'] = 'Yes';*/
  //delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
