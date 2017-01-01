export default function syncIsSupported() {
  return !!chrome.storage.sync;
}

