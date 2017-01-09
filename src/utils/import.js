import UUID from 'uuid-js';

import { formDataToFormString } from './requestUtils';

function stringHeadersToObject(string) {
  const result = [];

  string.split('\n').forEach(line => {
    if (!line) {
      return;
    }

    const header = line.split(': ');
    result.push({
      name: header[0],
      value: header[1],
    });
  });

  return result;
}

/**
 * The postman import complies with the format
 * the Chrome extension postman uses for its
 * "download collection" feature. This is to
 * provide an easy migration path for users
 * and help teams cooperate across extensions.
 */
export function fromPostman(json) {
  if (!json) {
    return {};
  }

  const entries = json.requests;

  return entries.map(request => {
    const result = request;
    result.headers = stringHeadersToObject(result.headers);

    if (Array.isArray(result.data)) {
      result.data = formDataToFormString(
        result.data.map(data => ({
          name: data.key,
          value: data.value,
        })),
      );
    }

    // Trim away fluff
    return {
      id: UUID.create().toString(),
      method: result.method,
      url: result.url,
      headers: result.headers,
      data: result.data,
    };
  });
}

/**
 * The HAR import complies with the HAR 1.2
 * spec that can be found here:
 * http://www.softwareishard.com/blog/har-12-spec
 *
 * We don't use everything, as there is a
 * fair bit of fluff that is not needed to
 * archive a request to a collection.
 */
export function fromHAR(har) {
  if (!har) {
    return {};
  }

  const entries = har.log.entries;
  const result = [];

  entries.forEach(entry => {
    // Trim away fluff
    result.push({
      id: UUID.create().toString(),
      method: entry.request.method,
      url: entry.request.url,
      headers: entry.request.headers,
      data: entry.request.postData ? entry.request.postData.text : undefined,
    });
  });

  return result;
}

