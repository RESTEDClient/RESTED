import { reMapHeaders } from 'utils/requestUtils';

/**
 * JSON values should be typed as their respective JSON types
 * when possible, instead of always being strings.
 */
const parseValues = object => {
  const result = object;

  // eslint-disable-next-line no-restricted-syntax
  for (const key in result) {
    if ({}.hasOwnProperty.call(result, key)) {
      const value = result[key];
      try {
        result[key] = JSON.parse(value);
      } catch (e) {
        // no-op
      }
    }
  }

  return result;
};

export default function buildRequestData(bodyType, formData) {
  switch (bodyType) {
    case 'multipart':
      if (formData && formData.filter(f => f.name).length > 0) {
        const body = new FormData();

        formData.forEach(f => {
          body.append(f.name, f.value);
        });

        return body;
      }
      break;

    case 'urlencoded':
      if (formData && formData.filter(f => f.name).length > 0) {
        let body = '';

        formData.forEach((field, index) => {
          if (index !== 0) {
            body += '&';
          }
          body += `${field.name}=${field.value}`;
        });

        return body;
      }
      break;

    case 'json':
      if (formData && formData.filter(f => f.name).length > 0) {
        let body = reMapHeaders(formData);
        body = parseValues(body);

        return JSON.stringify(body);
      }
      break;

    default:
      return null;
  }
  return null;
}
