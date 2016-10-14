/*
 * This pattern is to prevent Character out of range
 * exceptions when input unicode strings.
 * See following article by Johan Sundström:
 *
 * http://ecmanaut.blogspot.no/2006/07/encoding-decoding-utf8-in-javascript.html
 */
export default const encode = str => (
  window.btoa(unescape(encodeURIComponent(str)))
);

