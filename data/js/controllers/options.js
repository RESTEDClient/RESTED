'use strict';

angular.module('RestedApp')
.controller('OptionsCtl', ['HIGHLIGHT_STYLES', 'THEMES', '$scope', '$rootScope', '$timeout', 'Base64', 'Highlight', 'Import', 'Export', 'Modal', 'Collection', 'UrlVariables',
function(HIGHLIGHT_STYLES, THEMES, $scope, $rootScope, $timeout, Base64, Highlight, Import, Export, Modal, Collection, UrlVariables) {

  $scope.activeTab = 'templateVariablesForm';
  $scope.importMethod = 'HAR';
  $scope.themes = THEMES;
  $scope.styles = HIGHLIGHT_STYLES;

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

  var doExport = function() {
    var requests;

    if ($scope.collectionToExport == null) {
      return;
    }

    try {
      var collection = $scope.$root.collections[$scope.collectionToExport];
      var requests = collection.requests;
      var result = Export['to' + $scope.importMethod](requests, collection);
      $scope.exportText = JSON.stringify(result, ' ', 2);
      $scope.base64EncodedExportText = Base64.encode($scope.exportText);
    } catch(e) {
      console.error(e);
      return $scope.exportFeedback = 'Error while exporting: ' + e;
    }
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
    }],
    exportForm: [{
      text: 'Export',
      click: doExport
    }]
  };

  $scope.setTab = function(tabName) {
    $scope.activeTab = tabName;
    $rootScope.modalOptions.actions = actions[tabName];

    if (tabName === 'optionsForm') {
      $timeout(Highlight.highlightAll, 30);
    }
  };

  $scope.removeParam = function(param) {
    $rootScope.urlVariables = $rootScope.urlVariables.filter(function(item) {
      return item !== param;
    });
  };
}]);

