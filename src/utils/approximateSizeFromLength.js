/**
 * Returns the approximate size of a string in bytes
 */
export default function approximateSizeFromLength(string) {
  if (!string) {
    return null;
  }

  return string.split(/%(?:u[0-9A-F]{2})?[0-9A-F]{2}|./).length - 1;
}

