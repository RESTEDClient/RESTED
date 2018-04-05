export default [
  {
    name: 'Accept',
    description: 'Content-Types that are acceptable for the response',
  }, {
    name: 'Accept-Charset',
    description: 'Character sets that are acceptable',
  }, {
    name: 'Accept-Datetime',
    description: 'Acceptable version in time',
  }, {
    name: 'Accept-Encoding',
    description: 'List of acceptable encodings',
  }, {
    name: 'Accept-Language',
    description: 'List of acceptable human languages for response',
  }, {
    name: 'Access-Control-Request-Headers',
    description: 'Initiates a request for cross-origin resource sharing with Origin',
  }, {
    name: 'Access-Control-Request-Method,',
    description: 'Initiates a request for cross-origin resource sharing with Origin',
  }, {
    name: 'Authorization',
    description: 'Authentication credentials for HTTP authentication',
  }, {
    name: 'Cache-Control',
    description: 'Used to specify directives that must be obeyed by all caching mechanisms along the request-response chain',
  }, {
    name: 'Connection',
    description: 'Control options for the current connection and list of hop-by-hop request fields',
  }, {
    name: 'Content-Length',
    description: 'The length of the request body in octets (8-bit bytes)',
  }, {
    name: 'Content-MD5',
    description: 'A Base64-encoded binary MD5 sum of the content of the request body',
  }, {
    name: 'Content-Type',
    description: 'The MIME type of the body of the request (used with POST and PUT requests)',
  }, {
    name: 'Cookie',
    description: 'An HTTP cookie previously sent by the server with Set-Cookie',
  }, {
    name: 'DNT',
    description: 'Requests a web application to disable their tracking of a user',
  }, {
    name: 'Date',
    description: 'The date and time that the message was originated (in "HTTP-date" format as defined by RFC 7231 Date/Time Formats)',
  }, {
    name: 'Expect',
    description: 'Indicates that particular server behaviors are required by the client',
  }, {
    name: 'Forwarded',
    description: 'Disclose original information of a client connecting to a web server through an HTTP proxy',
  }, {
    name: 'From',
    description: 'The email address of the user making the request',
  }, {
    name: 'Front-End-Https',
    description: 'Non-standard header field used by Microsoft applications and load-balancers',
  }, {
    name: 'Host',
    description: 'The domain name of the server (for virtual hosting), and the TCP port number on which the server is listening. The port number may be omitted if the port is the standard port for the service requested',
  }, {
    name: 'If-Match',
    description: 'Only perform the action if the client supplied entity matches the same entity on the server. This is mainly for methods like PUT to only update a resource if it has not been modified since the user last updated it',
  }, {
    name: 'If-Modified-Since',
    description: 'Allows a 304 Not Modified to be returned if content is unchanged',
  }, {
    name: 'If-None-Match',
    description: 'Allows a 304 Not Modified to be returned if content is unchanged, see HTTP ETag',
  }, {
    name: 'If-Range',
    description: 'If the entity is unchanged, send me the part(s) that I am missing; otherwise, send me the entire new entity',
  }, {
    name: 'If-Unmodified-Since',
    description: 'Only send the response if the entity has not been modified since a specific time',
  }, {
    name: 'Max-Forwards',
    description: 'Limit the number of times the message can be forwarded through proxies or gateways',
  }, {
    name: 'Origin',
    description: 'Initiates a request for cross-origin resource sharing (asks server for Access-Control-* response fields)',
  }, {
    name: 'Pragma',
    description: 'Implementation-specific fields that may have various effects anywhere along the request-response chain',
  }, {
    name: 'Proxy-Authorization',
    description: 'Authorization credentials for connecting to a proxy',
  }, {
    name: 'Proxy-Connection',
    description: 'Implemented as a misunderstanding of the HTTP specifications. Common because of mistakes in implementations of early HTTP versions. Has exactly the same functionality as standard Connection field',
  }, {
    name: 'Range',
    description: 'Request only part of an entity. Bytes are numbered from 0',
  }, {
    name: 'Referer',
    description: 'This is the address of the previous web page from which a link to the currently requested page was followed. (The word “referrer” has been misspelled in the RFC as well as in most implementations to the point that it has become standard usage and is considered correct terminology)',
  }, {
    name: 'TE',
    description: 'The transfer encodings the user agent is willing to accept: the same values as for the response header field Transfer-Encoding can be used, plus the "trailers" value (related to the "chunked" transfer method) to notify the server it expects to receive additional fields in the trailer after the last, zero-sized, chunk. Only trailers is supported in HTTP/2',
  }, {
    name: 'Upgrade',
    description: 'Ask the server to upgrade to another protocol. Must not be used to upgrade to HTTP/2',
  }, {
    name: 'User-Agent',
    description: 'The user agent string of the user agent',
  }, {
    name: 'Via',
    description: 'Informs the server of proxies through which the request was sent',
  }, {
    name: 'Warning',
    description: 'A general warning about possible problems with the entity body',
  }, {
    name: 'X-ATT-DeviceId',
    description: 'Allows easier parsing of the MakeModel/Firmware that is usually found in the User-Agent String of AT&T Devices',
  }, {
    name: 'X-Correlation-ID',
    description: 'Correlates HTTP requests between a client and server',
  }, {
    name: 'X-Csrf-Token',
    description: 'Used to prevent cross-site request forgery',
  }, {
    name: 'X-CSRFToken',
    description: 'Used to prevent cross-site request forgery',
  }, {
    name: 'X-XSRF-TOKEN',
    description: 'Used to prevent cross-site request forgery',
  }, {
    name: 'X-Forwarded-For',
    description: 'A de facto standard for identifying the originating IP address of a client connecting to a web server through an HTTP proxy or load balancer',
  }, {
    name: 'X-Forwarded-Host',
    description: 'A de facto standard for identifying the original host requested by the client in the Host HTTP request header, since the host name and/or port of the reverse proxy (load balancer) may differ from the origin server handling the request',
  }, {
    name: 'X-Forwarded-Proto',
    description: 'A de facto standard for identifying the originating protocol of an HTTP request, since a reverse proxy (or a load balancer) may communicate with a web server using HTTP even if the request to the reverse proxy is HTTPS. An alternative form of the header (X-ProxyUser-Ip) is used by Google clients talking to Google servers',
  }, {
    name: 'X-Http-Method-Override',
    description: 'Requests a web application to override the method specified in the request (typically POST) with the method given in the header field (typically PUT or DELETE)',
  }, {
    name: 'X-Request-ID',
    description: 'Correlates HTTP requests between a client and server',
  }, {
    name: 'X-Requested-With',
    description: 'Mainly used to identify Ajax requests. Most JavaScript frameworks send this field with value of XMLHttpRequest',
  }, {
    name: 'X-UIDH',
    description: 'Server-side deep packet insertion of a unique ID identifying customers of Verizon Wireless; also known as "perma-cookie" or "supercookie"',
  }, {
    name: 'X-Wap-Profile',
    description: 'Links to an XML file on the Internet with a full description and details about the device currently connecting',
  },
];

