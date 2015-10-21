'use strict';

angular.module('RestedApp')
.controller('OptionsCtl', ['$scope', '$rootScope', 'Import', 'Modal', 'Collection', 'UrlVariables',
function($scope, $rootScope, Import, Modal, Collection, UrlVariables) {

  $scope.activeTab = 'templateVariablesForm';
  $scope.importMethod = 'HAR';

  var doImport = function() {
    var requests;

    try {
      var importObj = JSON.parse($scope.importText);
      requests = Import['from' + $scope.importMethod](importObj);
    } catch(e) {
      console.error(e);
      return $scope.importFeedback = 'Error while parsing. Is your text formatted correctly?';
    }

    Modal.set({
      title: 'Successfy parsed imports',
      body: 'Would you like to add the following to an existing collection or add as a new collection?',
      includeURL: 'views/fragments/selectCollectionGroupForm.html',
      actions: [{
        text: 'Add to collection',
        click: function() {
          requests.forEach(function(request) {
            Collection.addRequestToCollection(request, $rootScope.selectedCollectionIndex);
          });
        }
      }, {
        text: 'New collection',
        click: function() {
          Collection.newCollection(requests);
        }
      }]
    });
  };

  var actions = {
    templateVariablesForm: [{
      text: 'Save',
      click: UrlVariables.setVariables
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
    $rootScope.modalOptions.actions = actions[tabName];
  };

  $scope.removeParam = function(param) {
    $rootScope.urlVariables = $rootScope.urlVariables.filter(function(item) {
      return item !== param;
    });
  };
}]);

