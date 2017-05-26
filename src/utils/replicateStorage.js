/** Copies from one storage area to another */
export default function replicateStorage(targetLocal) {
  const { sync, local } = chrome.storage;
  const source = targetLocal ? sync : local;
  const target = targetLocal ? local : sync;

  target.clear(() => {
    source.get(null, target.set);
  });
}

