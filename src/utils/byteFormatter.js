const KB = 1024;
const MB = 1024 * KB;
const GB = 1024 * MB;

/*
 * Formats the provided number in bytes as a string of bytes,
 * KB, MB, or GB, with one decimal point and the unit suffix.
 */
export default function byteFormatter(bytes) {
  if (bytes < 100) return `${bytes} bytes`;
  if (bytes > GB) return `${(bytes / GB).toFixed(1)} GB`;
  if (bytes > MB) return `${(bytes / MB).toFixed(1)} MB`;
  return `${(bytes / KB).toFixed(1)} KB`;
};
