import { setModalData, throwError } from '../redux/modal/actions';
/*
 * This service uses the browser.storage.sync API to
 * store requested data in Chrome or Firefox sync.
 *
 * With this service you should always be able to
 * assume that BrowserSync is enabled and supported,
 * as all checks agains this will be done here.
 */

function handleErrorsAndCallCallback(dispatch, callback, ...args) {
  if (chrome.runtime.lastError) {
    dispatch(throwError(
      'An error occured when reading/writing the browser sync storage\n',
      chrome.runtime.lastError
    ));
    return;
  }

  if (args.length === 0) return;

  callback.apply(this, args);
}

/**
 * Assert sync is supported and not disabled
 */
function assertInvariants() {
  // TODO! Connect with redux for options && $rootScope.options.sync === true;
  return chrome.storage.sync;
}

//
// TODO Refactor these to use promises
// TODO Integreate neatly with redux as a higher order component instead
// Needs to be connected and dispatch, so this is a good use for a HoC
//

/** Pass null as name to get all data */
export function get(dispatch, name, callback) {
  // Abort if sync is not supported or disabled
  if (!assertInvariants()) return;

  if (!name) {
    chrome.storage.sync.get(handleErrorsAndCallCallback.bind(this, dispatch, callback));
  } else {
    chrome.storage.sync.get(name, handleErrorsAndCallCallback.bind(this, dispatch, callback));
  }
}

export function sizeOf() {}

export function set(dispatch, name, data, callback) {
  // Abort if sync is not supported or disabled
  if (!assertInvariants()) return;
  if (!name) return;

  const keyValue = {};
  keyValue[name] = data;
  chrome.storage.sync.set(keyValue, handleErrorsAndCallCallback.bind(this, dispatch, callback));
}

export function clear(dispatch, callback) {
  // Abort if sync is not supported or disabled
  if (!assertInvariants()) return;

  dispatch(setModalData({
    title: 'Clear synced storage?',
    body: 'Are you sure you would like to clear the browser\'s synced ' +
      'data? This will clear data on all devices with sync enabled.',
    actions: [{
      text: 'Clear sync',
      click: function action() {
        chrome.storage.sync.clear(handleErrorsAndCallCallback.bind(this, dispatch, callback));
      },
    }],
  }));
}

