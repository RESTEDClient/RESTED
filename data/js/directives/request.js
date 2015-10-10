'use strict';

angular.module('RestedApp')
.directive('request', function(SPINNER_SHOW_DELAY, DB, Request, RequestUtils, Base64, Modal, $timeout) {
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

      var spinnerTimeout;

      var processReturnData = function() {
        var response = this;

        // Manually start $digest because angular does not know
        // about the async XMLHttpresponse
        scope.$apply(function() {
          scope.response = response;
          scope.response.headers = response.getAllResponseHeaders();

          // Format json pretty-like
          if (response.getResponseHeader('Content-Type') && response.getResponseHeader('Content-Type').toLowerCase().indexOf('json') > -1) {
            scope.response.formattedResponse = JSON.stringify(JSON.parse(response.responseText), null, 2);
          } else {
            scope.response.formattedResponse = response.responseText;
          }

          $timeout.cancel(spinnerTimeout);
          scope.requestInProgress = false;
        });
      };

      scope.sendRequest = function() {
        var request = angular.copy(scope.request);
        var headers = request.headers || [];

        // Check for sillyness
        // If no URL is provided, assume user wants the placeholder URL.
        if (!request.url) {
          // This is supposed to mutate both request panel and temp request
          scope.request.url = request.url = RequestUtils.randomURL();
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

        // Delay showing spinner for fast connections
        spinnerTimeout = $timeout(function() {
          scope.requestInProgress = true;
        }, SPINNER_SHOW_DELAY);
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

      scope.removeHeader = function(header) {
        scope.request.headers = scope.request.headers.filter(function(item) {
          return item !== header;
        });
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
        // Animation logic handled in css and ngHide
        scope.$root.options.collectionsMinimized = !scope.$root.options.collectionsMinimized;

        // Persist to DB
        DB.options.set({name: 'options', options: scope.$root.options}).then(null, Modal.errorHandler);
      };

      scope.addRequestConfig = {
        title: 'Save or update request',
        classes: ['fa', 'fa-plus']
      };

      scope.showOptionsConfig = {
        title: 'Show options',
        classes: ['fa', 'fa-cog']
      };

      // options modal logic
      scope.showOptionsModal = function() {
        Modal.set({
          title: 'Options',
          includeURL: 'views/fragments/optionsTabs.html',
          actions: [{
            text: 'Save',
            click: function saveVariables() {
              var payload = {
                name: 'urlVariables',
                variables: scope.$root.urlVariables
              };

              DB.urlVariables.set(payload).then(Modal.remove, function errorHandler(error) {
                Modal.throwError('An error occured: ', error);
              });
            }
          }]
        });
      };

      scope.getRandomURL = RequestUtils.randomURL;
    }
  };
});
