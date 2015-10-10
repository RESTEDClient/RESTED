'use strict';

angular.module('RestedApp')
.controller('OptionsCtl', function($scope, $rootScope, Import, Modal) {
  $scope.activeTab = 'templateVariablesForm';
  $scope.importMethod = 'HAR';

  var doImport = function() {
    var requests;

    try {
      var importObj = JSON.parse($scope.importText);
      requests = Import['from' + $scope.importMethod](importObj);
    } catch(e) {
      return $scope.importFeedback = 'Error while parsing. Is your text formatted correctly?';
    }

    Modal.set({
      title: 'Successfy parsed imports',
      body: 'Would you like to add the following to your collection or replace your existing collection?',
      actions: [{
        text: 'Add',
        click: function() {
          requests.forEach(function(request) {
            $rootScope.addRequestToCollection(request);
            Modal.remove();
          });
        }
      }, {
        text: 'Replace',
        click: function() {

        }
      }]
    });
  };

  var actions = {
    templateVariablesForm: [{
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
    }],
    optionsForm: [{
      text: 'Save'
    }],
    importForm: [{
      text: 'Import',
      click: doImport
    }]
  };

  $scope.setTab = function(tabName) {
    $scope.activeTab = tabName;
    $scope.$root.modalOptions.actions = actions[tabName];
  };
});
