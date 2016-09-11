'use strict';

// Register app
var app = angular.module('RestedApp', ['dndLists']);

// Support data-urls
app.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|local|data):/);
}]);

