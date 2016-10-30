

/**
 * This service handles the changing of options
 * in the app. Some options must be handled in a
 * specific manner, like the sync option.
 */
angular.module('RestedApp')
.factory('Options', ['$rootScope', '$timeout', 'Modal', 'Highlight', 'DB',
function ($rootScope, $timeout, Modal, Highlight, DB) {
  function handleSyncOption(val) {
    // You shouldn't be here! Get out!
    if (!chrome.storage.sync) {
      $rootScope.options.sync = false;
      return;
    }

    // Turn this off until the user confirms their intent
    $rootScope.options.sync = false;

    // Sync turned on, query user for what to do next
    if (val === true) {
      function onUpdate() {
        $rootScope.$apply(() => {
          if (chrome.runtime.lastError) {
            Modal.throwError('An error occured when reading/writing the browser sync storage\n', chrome.runtime.lastError);
            return;
          }

          Modal.remove();
        });
      }

      Modal.set({
        title: 'Activating browser sync',
        body: 'Activating this feature will start syncing all your local data across the internet to the other devices where you have turned this feature on. ' +
        'If you want to keep your local data, then RESTED will have to overwrite the remote sync server data. Otherwise, overwrite the local data with the remote ' +
        'server\'s sync data.',
        actions: [{
          text: 'Overwrite local',
          click() {
            // Persist sync options to state
            $rootScope.options.sync = true;
            DB.options.set({ name: 'options', options: $rootScope.options })
              .then(() => {
                // Overwrite local storage
                chrome.storage.sync.get(data => {
                  console.log('Copying data into local storage', data);

                  // Clear the local storage so we don't get weird inconsistensies
                  // when remote stores are empty
                  chrome.storage.local.clear(() => {
                    chrome.storage.local.set(data, onUpdate);

                    // Completely clean state by reloading
                    location.reload();
                  });
                });
              }, Modal.errorHandler);
          },
        }, {
          text: 'Overwrite remote',
          click() {
            // Persist sync options to state
            $rootScope.options.sync = true;
            DB.options.set({ name: 'options', options: $rootScope.options })
              .then(() => {
                // Overwrite remote storage
                chrome.storage.local.get(data => {
                  console.log('Copying data into sync storage', data);
                  chrome.storage.sync.set(data, onUpdate);
                });
              }, Modal.errorHandler);
          },
        }],
      });
    }

    // We do not clear the sync store on incoming false value, as a user might
    // want to disable the sync on one of his/her machines without losing all
    // of the data. Clearing the sync store has to be a manual user action.
  }

  return {
    handleOptions(option, val) {
      $rootScope.$broadcast(`${option}-change`, val);

      // If we are changing style or turning styling on
      if (option === 'highlightStyle' || (option === 'disableHighlighting' && val === false)) {
        // For performance reasons, we close the response when changing style.
        // This is because if we change styles mid-flight, it can cause the
        // browser to become really undesponsive.

        // Wait for request directive to remove response
        $timeout(() => {
          // Redraw highlight styles
          Highlight.highlightAll();
        });
      }

      // If we are changing the sync settings, we need to update the sync store
      if (option === 'sync') {
        handleSyncOption(val);

        // Handle setting of state in handleSycOption instead of below
        if (val === true) return;
      }

      $rootScope.options[option] = val;
      DB.options.set({ name: 'options', options: $rootScope.options })
        .then(null, Modal.errorHandler);
    },
  };
}]);

