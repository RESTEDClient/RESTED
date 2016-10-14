import * as BrowserSync from './browserSync';
import {
  DB_OBJECT_STORE_NAME,
  DB_URL_VARIABLES_STORE_NAME,
  DB_OPTIONS_STORE_NAME,
  DB_HISTORY_STORE_NAME,
} from '../constants/constants';

function msg(success, message, object) {
  return { success, message, object };
}

function checkError(onSuccess, onError) {
  const lastError = chrome.runtime.lastError;
  if (lastError) {
    // Unset to not trigger next time
    chrome.runtime.lastError = undefined;

    onError(lastError);
  } else {
    onSuccess();
  }
}

// TODO Make into HoC storage component for easy access to dispatch and props
// TODO Add try/catches to fallback to resetting db if things break
function createStore(storeName) {
  return {
    get() {
      return new Promise((resolve, reject) => {
        chrome.storage.local.get(storeName, items => {
          checkError(() => {
            resolve(items[storeName] || []);
          }, event => {
            reject(msg(false, `An error occured when fetching from storage.local!storeName=${storeName}`, event));
          });
        });
      });
    },
    add(dispatch, item) {
      return new Promise((resolve, reject) => {
        if (!item || !item.name) {
          reject(msg(false, `Attempted to add using a bad item in storage.local! storeName=${storeName}`, item));
        }

        // Referring to the get() above
        this.get().then(items => {
          const newItems = items.concat(item);
          chrome.storage.local.set({ [storeName]: newItems }, () => {
            checkError(() => {
              resolve(msg(true, 'Successfully added an entry to the database', item));

              // TODO
              BrowserSync.set(dispatch, storeName, newItems);
            }, event => {
              reject(msg(false, `An error occured when adding to storage.local! storeName=${storeName}`, event));
            });
          });
        });
      });
    },
    replace(dispatch, items) {
      return new Promise((resolve, reject) => {
        chrome.storage.local.set({ [storeName]: items }, () => {
          checkError(() => {
            resolve(msg(true, 'Successfully replaced a collection', items));

            // TODO
            BrowserSync.set(dispatch, storeName, items);
          }, event => {
            reject(msg(false, `An error occured when replacing a collection in storage.local! storeName=${storeName}`, event));
          });
        });
      });
    },
    set(dispatch, item) {
      return new Promise((resolve, reject) => {
        if (!item || !item.name) {
          reject(msg(false, `Attempted to set a bad item in storage.local! storeName=${storeName}`, item));
        }

        // Referring to the get() above
        this.get().then(items => {
          const added = items.some((something, index) => {
            if (something.name === item.name) {
              items[index] = item; // eslint-disable-line no-param-reassign
              return true;
            }

            return false;
          });

          // If no item was found to replace, append instead
          if (!added) {
            items.push(item);
          }

          chrome.storage.local.set({ [storeName]: items }, () => {
            checkError(() => {
              resolve(msg(true, 'Successfully updated an entry', item));

              // TODO
              BrowserSync.set(dispatch, storeName, items);
            }, event => {
              reject(msg(false, `An error occured when updating and entry in storage.local! storeName=${storeName}`, event));
            });
          });
        });
      });
    },
    delete(dispatch, item) {
      return new Promise((resolve, reject) => {
        if (!item || !item.name) {
          reject(msg(false, `Attempted to delete using a bad item in storage.local! storeName=${storeName}`, item));
          return;
        }

        // Referring to the get() above
        this.get().then(items => {
          const newItems = items.filter(i => i.name !== item.name);
          chrome.storage.local.set({ [storeName]: newItems }, () => {
            checkError(() => {
              resolve(msg(true, 'Successfully deleted an entry from the database', item));

              BrowserSync.set(dispatch, storeName, newItems);
            }, event => {
              reject(msg(false, `An error occured when deleting an entry in storage.local! storeName=${storeName}`, event));
            });
          });
        });
      });
    },
  };
}

export const collections = createStore(DB_OBJECT_STORE_NAME);
export const urlVariables = createStore(DB_URL_VARIABLES_STORE_NAME);
export const options = createStore(DB_OPTIONS_STORE_NAME);
export const history = createStore(DB_HISTORY_STORE_NAME);

