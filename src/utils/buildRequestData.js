import { reMapHeaders } from 'utils/requestUtils';

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
        const body = reMapHeaders(formData);

        return JSON.stringify(body);
      }
      break;

    default:
      return null;
  }
  return null;
}
