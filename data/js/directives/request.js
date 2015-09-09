'use strict';

angular.module('RestedApp')
.directive('request', function(DB, Request, RequestUtils, Base64, Modal) {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/request.html',
    scope: {
      request: '=',
      addToCollection: '&'
    },
    link: function(scope, element, attrs, controllers) {
      scope.options = {
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'JSONP']
      };

      scope.slidden = {};
      scope.urlVariables = [];
      scope.headers = [];

      var processReturnData = function() {
        var response = this;

        // Manually start $digest because angular does not know
        // about the async XMLHttpresponse
        scope.$apply(function() {
          scope.response = response;
          scope.response.headers = response.getAllResponseHeaders();

          // Format json pretty-like
          if (response.getResponseHeader('Content-Type') && response.getResponseHeader('Content-Type').toLowerCase().indexOf('json') > -1) {
            scope.response.formattedResponse = JSON.parse(response.responseText);
          } else {
            scope.response.formattedResponse = response.responseText;
          }
        });
      };

      scope.sendRequest = function() {
        var request = angular.copy(scope.request);
        var headers = request.headers || [];

        // Check for sillyness
        // If no URL is provided, assume user wants the placeholder URL.
        if (!request.url) {
          request.url = RequestUtils.randomURL();
        } else if (request.url === 'chrome://rested/content/rested.html') {
          return Modal.set({
            title: 'But... Why?',
            body: 'You are aware of what you just did, right?'
          });
        }

        // Add basic auth header
        var basicAuth = scope.request.basicAuth;
        if (basicAuth && basicAuth.username) {
          var password = basicAuth.password ? basicAuth.password : '';
          headers.push({
            name: 'Authorization',
            value: 'Basic ' + Base64.encode(basicAuth.username + ':' + password)
          });
        }

        request.headers = headers;

        Request.run(request, RequestUtils.reMapHeaders(scope.$root.urlVariables, true), processReturnData);
      };

      scope.addHeader = function() {
        var newHeader = {
          name: '',
          value: ''
        };

        if(!Array.isArray(scope.request.headers)) {
          scope.request.headers = [];
        }

        var isAlreadyAdded = scope.request.headers.some(function(item) {
          return newHeader.name == item.name;
        });

        if(isAlreadyAdded) {
          return;
        }

        scope.request.headers.push(newHeader);
      };

      scope.addRequest = function(request) {
        if(!request.url) {
          // The non-hiding text for the add button
          // will be fixed when we implement modals.
          Modal.set({
            title: 'Don\'t be silly',
            body: 'Please provide a URL for the request to be added.'
          });
          return;
        }

        scope.addToCollection(request);
      };

      scope.slideToggle = function(id) {
        scope.slidden[id] = !scope.slidden[id];
        $('#' + id).slideToggle();
      };

      scope.toggleCollections = function() {
        // Logic handled in css and ngHide
        scope.$root.collectionsMinimized = !scope.$root.collectionsMinimized;

        var isMinimized = scope.$root.collectionsMinimized;
        scope.toggleCollectionsConfig = {
          title: (isMinimized ? 'Show' : 'Hide') + ' collections',
          classes: ['fa', (isMinimized ? 'fa-compress' : 'fa-expand')]
        };
      };

      scope.toggleCollectionsConfig = {
        title: 'Hide collections',
        classes: ['fa', 'fa-expand']
      };

      scope.addRequestConfig = {
        title: 'Add request to collection',
        classes: ['fa', 'fa-plus']
      };

      scope.showVariablesConfig = {
        title: 'Show URL parameters',
        classes: ['fa', 'fa-cog']
      };

      // urlVariables logic
      scope.showVariablesModal = function() {
        Modal.set({
          title: 'URL parameters',
          body: 'You can include dynamic elements into your URLs. Simply type {{something}} into your URL, and then add "something" here, and it will be resolved for you. This works across all requests you have saved.',
          includeURL: 'views/fragments/templateVariablesForm.html',
          action: {
            text: 'Save',
            click: function saveVariables() {
              var payload = {
                name: 'urlVariables',
                variables: scope.$root.urlVariables
              };

              DB.urlVariables.set(payload).then(
                function successHandler() {
                  Modal.remove();
                },
                function errorHandler(error) {
                  console.error(event);
                  Modal.set({
                    title: 'An error occured',
                    body: event.message
                  });
                }
              );
            }
          }
        });
      };

      scope.getRandomURL = RequestUtils.randomURL;
    }
  };
});
