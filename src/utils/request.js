/**
* Prepend http:// if missing from url
* Make sure to allow https
*/
export function prependHttp(url) {
  let result = url;
  if (!(/^https?:\/\//.test(url))) {
    result = `http://${url}`;
  }

  return result;
}

/**
* Takes an url in the form of site.com/{{key}} and
* maps the key up against a variable in the params
* object. It then returns the complete URL.
*
* The function also collapses {{key}} to nothing
* if key is missing, and removes any double slashes
* left behind.
*/
export function mapParameters(url, params) {
  if (!url) return null;

  return url.replace(/\{\{(\w+)\}\}/g, (match, capture) => {
    const param = params ? params[capture] : null;
    return param || '';
  }).replace(/([^:]\/)\/+/g, '$1');
}

