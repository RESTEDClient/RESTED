import { PLACEHOLDER_URLS } from 'constants/constants';
import { mapParameters } from 'utils/request';

/**
 * According to MDN, this makes us more adherent
 * to RFC 3986, which is good, I guess?!
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
 */
function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, c => (
    `%${c.charCodeAt(0).toString(16)}`
  ));
}

function assignUrlVariables(header, params) {
  return {
    name: header.name,
    value: mapParameters(header.value, params),
  };
}

/**
 * Translates data from the way we can use it
 * effectively to the way fetch takes data.
 *
 * Object:
 * {
 *   headerName: value
 * }
 */
export function reMapHeaders(headers, parameters) {
  if (!headers) {
    return {};
  }

  return headers
    .filter(header => header && header.name)
    .map(variable => assignUrlVariables(variable, parameters))
    .reduce((result, header) => ({
      ...result,
      [header.name]: header.value,
    }), {});
}

/**
* Generate random placeholder URL and cache it so we don't fetch every digest.
*/
let placeholder;
export function randomURL() {
  if (!placeholder) {
    placeholder = PLACEHOLDER_URLS[Math.floor(Math.random() * PLACEHOLDER_URLS.length)];
  }

  return placeholder;
}


/**
 * Take an array of objects and transform it into
 * a URL encoded form data string suitable to be
 * posted to a server.
 */
export function formDataToFormString(formData) {
  if (!formData) {
    return '';
  }

  const result = formData
    .filter(item => item && item.name)
    .reduce((prev, item, i) => (
      `${prev}${i !== 0 ? '&' : ''}${fixedEncodeURIComponent(item.name)}=${item.value ? fixedEncodeURIComponent(item.value) : ''}`
    ), '');

  return result.replace(/%20/g, '+');
}

/**
 * Take an array of objects and transform it into
 * a string of headers, suitable for being exported
 * to postman json.
 */
export function headersToHeaderString(headers) {
  if (!headers) {
    return '';
  }

  const result = headers
    .filter(item => item && item.name)
    .reduce((prev, { name, value }) => (
      `${prev ? `${prev}\n` : ''}${name}: ${value || ''}`
    ), '');

  return `${result}\n`;
}

export function focusUrlField() {
  document.getElementById('url').focus();
}

