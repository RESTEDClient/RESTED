import * as RequestUtils from './requestUtils';

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

export function createXMLHttpRequest(req) {
  const request = new XMLHttpRequest();
  request.open(req.method, req.url);
  request.withCredentials = true;

  if (Array.isArray(req.headers)) {
    req.headers.forEach(header => {
      if (header.name) {
        request.setRequestHeader(header.name, header.value);
      }
    });
  }

  return request;
}

export default function run(request, parameters, fn) {
  const preparedRequest = request;

  // Map URL parameters first to allow protocol in parameter
  let url = mapParameters(preparedRequest.url, parameters);

  // Prepend http if not provided
  url = prependHttp(url);

  preparedRequest.url = url;

  // TODO Bring into the 21st century
  const req = createXMLHttpRequest(preparedRequest);
  req.onloadend = fn.bind(req);

  if (request.useFormData) {
    req.send(RequestUtils.formDataToFormString(request.formData));
  } else {
    req.send(request.data);
  }
}

