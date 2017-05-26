function validateUrl({ url }) {
  // Empty URL is OK, will be replaced with fallback
  // Should at the very least be in the format of foo.bar
  if (url && !/.+\..+/.test(url)) {
    return 'Invalid URL';
  }

  return undefined;
}

export default values => ({
  url: validateUrl(values),
});

