'use strict';

angular.module('RestedApp')
.factory('History', ['DEFAULT_HISTORY_SIZE', '$rootScope', '$filter', 'DB', 'Modal',
function(DEFAULT_HISTORY_SIZE, $rootScope, $filter, DB, Modal) {
  var errorHandler = function(event) {
    Modal.throwError('An error occured when reading/writing to indexedDB: ', event);
  };

  return {
    pushHistory: function(request) {
      try {
        if (!$rootScope.history) {
          $rootScope.history = [];
        }

        // Avoid spamming history: Only push new request
        if ($rootScope.history[0]
        && $rootScope.history[0].url === request.url
        && $rootScope.history[0].method === request.method) {
          return;
        }

        // "Push" the request (actually unshift to the beginning)
        $rootScope.history.unshift(request);

        // Truncate the list to historySize
        var historySize = $rootScope.options.historySize != null
          ? $rootScope.options.historySize
          : DEFAULT_HISTORY_SIZE;
        $rootScope.history = $rootScope.history.slice(0, historySize);

        DB.history.set({name: 'history', requests: $rootScope.history})
          .then(Modal.remove, errorHandler);

      } catch (e) {
        console.error(e);
        Modal.throwError('error in history.pushHistory: ', e.toString());
      }
    },
    // removeRequestFromHistory: function(collection, index, collectionIndex) {
    //   Modal.set({
    //     title: 'Confirm deletion',
    //     body: 'Please confirm you wish to remove this request from your saved collection',
    //     actions: [{
    //       text: 'Confirm',
    //       click: function() {
    //         collection.requests.splice(index, 1);
    //         DB.collections.set(collection).then(Modal.remove, errorHandler);
    //       }
    //     }]
    //   });
    // },
    // clearCollection: function(callback) {
    //   Modal.set({
    //     title: 'Confirm deletion',
    //     body: 'Please confirm that you wish to delete your entire collection. This is not reversible',
    //     actions: [{
    //       text: 'Confirm',
    //       click: function() {
    //         if (!$rootScope.collections || !$rootScope.collections[0]) {
    //           return callback();
    //         }
    //         $rootScope.collections[0].requests = [];
    //         DB.collections.set($rootScope.collections[0]).then(Modal.remove, errorHandler);
    //         callback();
    //       }
    //     }]
    //   });
    // }
  };
}]);

