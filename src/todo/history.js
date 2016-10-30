

angular.module('RestedApp')
.factory('History', ['DEFAULT_HISTORY_SIZE', '$rootScope', '$filter', 'DB', 'Modal',
function (DEFAULT_HISTORY_SIZE, $rootScope, $filter, DB, Modal) {
  const errorHandler = function (event) {
    Modal.throwError('An error occured when reading/writing to indexedDB: ', event);
  };

  return {
    pushHistory(request) {
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
        const historySize = $rootScope.options.historySize != null
          ? $rootScope.options.historySize
          : DEFAULT_HISTORY_SIZE;
        $rootScope.history = $rootScope.history.slice(0, historySize);

        DB.history.set({ name: 'history', requests: $rootScope.history })
          .then(Modal.remove, errorHandler);
      } catch (e) {
        console.error(e);
        Modal.throwError('error in history.pushHistory: ', e.toString());
      }
    },

    removeRequestFromHistory(index) {
      // History isn't as important as collections, so no prompt here
      $rootScope.history.splice(index, 1);

      DB.history.set({ name: 'history', requests: $rootScope.history })
        .then(Modal.remove, errorHandler);
    },

    clearHistory(callback) {
      Modal.set({
        title: 'Confirm deletion',
        body: 'Please confirm that you wish to clear your entire history.',
        actions: [{
          text: 'Confirm',
          click() {
            if (!$rootScope.history) {
              return callback();
            }

            $rootScope.history = [];

            DB.collections.set({ name: 'history', requests: [] })
              .then(Modal.remove, errorHandler);

            callback();
          },
        }],
      });
    },
  };
}]);

