import * as RequestUtils from './requestUtils';

function getPostData(entry) {
  if (!entry.data && !entry.formData) {
    return {};
  }

  // If is form data key values, format as urlencoded data
  let urlEncoded = '';
  if (entry.formData) {
    urlEncoded = entry.formData.reduce((prev, data) => {
      // Prevent empty headers printing equal signs
      if (!data.name) {
        return prev;
      }

      return `${(prev ? `${prev}&` : '') + data.name}=${data.value}`;
    }, '');
  }

  // Strip away empty lines like above
  let params = [];
  if (Array.isArray(entry.formData)) {
    params = entry.formData.filter(item => item.name);
  }

  return {
    mimeType: urlEncoded ? 'application/x-www-form-urlencoded' : '',
    params,
    text: urlEncoded || entry.data,
  };
}

function addPostmanDataAttributes(postData) {
  if (!postData) {
    return [];
  }

  return postData.map(data => ({
    key: data.name,
    value: data.value,
    type: 'text',
    enabled: true,
  }));
}

/**
 * The postman export complies with the format
 * the Chrome extension postman uses for its
 * "download collection" feature. This is to
 * provide an easy migration path for users
 * and help teams cooperate across extensions.
 *
 * Postman requires some extra ids that we can
 * simply use RESTED ids for.
 */
export function toPostman(dataset, collection) {
  if (!dataset) {
    return {};
  }

  const postmanJson = {
    id: collection.id,
    name: collection.name,
    requests: [],
  };

  dataset.forEach(request => {
    if (request.formData) {
      postmanJson.requests.push({
        id: request.id,
        collectionId: collection.id,
        method: request.method,
        url: request.url,
        headers: RequestUtils.headersToHeaderString(request.headers),
        dataMode: 'urlencoded',
        data: addPostmanDataAttributes(request.formData),
        rawModeData: [],
      });
    } else {
      postmanJson.requests.push({
        id: request.id,
        collectionId: collection.id,
        method: request.method,
        url: request.url,
        headers: RequestUtils.headersToHeaderString(request.headers),
        data: [],
        dataMode: 'raw',
        rawModeData: request.data || [],
      });
    }
  });

  return postmanJson;
}

/**
 * The HAR export should comply with the HAR 1.2
 * spec that can be found here:
 * http://www.softwareishard.com/blog/har-12-spec
 *
 * We don't use everything, as there is a
 * fair bit of fluff that is not needed to
 * archive a request to a collection.
 */
export function toHAR(dataset) {
  if (!dataset) {
    return {};
  }

  const har = {
    log: {
      version: '1.2',
      creator: 'RESTED REST Client',
      Comment: 'An exported collection from RESTED',
      entries: [],
    },
  };

  dataset.forEach(entry => {
    har.log.entries.push({
      request: {
        method: entry.method,
        url: entry.url,
        headers: entry.headers,
        postData: getPostData(entry),
      },
    });
  });

  return har;
}

