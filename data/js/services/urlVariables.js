'use strict';

angular.module('RestedApp')
.factory('UrlVariables', function($rootScope, DB, Modal) {
  return {
    setVariables: function () {
      var payload = {
        name: 'urlVariables',
        variables: $rootScope.urlVariables
      };

      DB.urlVariables.set(payload).then(Modal.remove, Modal.errorHandler);
    }
  };
});

