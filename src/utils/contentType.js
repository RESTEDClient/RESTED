export default contentType => ({
  html: contentType && contentType.includes('text/html'),
  json: contentType && contentType.includes('application/json'),
  xml: contentType && (contentType.includes('application/xml') || contentType.includes('text/xml')),
});

