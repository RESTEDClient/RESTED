import * as Request from 'utils/request';
import RunRequest from 'utils/request';

describe('Request', () => {

  it('should load the service', () => {
    expect(Request).toBeDefined();
  });

  it('should have a run method as default export', () => {
    expect(RunRequest).toBeDefined();
    expect(RunRequest).toBeInstanceOf(Function);
  });

  /* prependHttp tests */
  it('should have a prependHttp method', () => {
    expect(Request.prependHttp).toBeDefined();
    expect(typeof Request.prependHttp).toBe('function');
  });

  it('should prepend http when appropriate', () => {
    var goodUrl = 'http://vg.no';
    expect(Request.prependHttp(goodUrl)).toEqual(goodUrl);

    var badUrl = 'vg.no';
    expect(Request.prependHttp(badUrl)).toEqual('http://' + badUrl);

    var httpsUrl = 'https://vg.no';
    expect(Request.prependHttp(httpsUrl)).toEqual(httpsUrl);
  });

  /* mapParameters tests */
  it('should have a mapParameters method', () => {
    expect(Request.mapParameters).toBeDefined();
    expect(Request.mapParameters).toBeInstanceOf(Function);
  });

  it('should have a map parameters to a url template', () => {
    var plainUrl = 'http://www.reddit.com/r/aww?questonmark=equals-sign&ampersand=';
    expect(Request.mapParameters(plainUrl)).toEqual(plainUrl);

    var params = {
      key: 'value',
      'STATIC_KEY': 'EuR_ek44!\\'
    };
    var templateUrl = 'http://someapi.com?API_KEY={{key}}&{{STATIC_KEY}}=why';
    var result      = 'http://someapi.com?API_KEY=value&EuR_ek44!\\=why';
    expect(Request.mapParameters(templateUrl, params)).toEqual(result);
  });

  /* createXMLHttpRequest tests */
  it('should have a createXMLHttpRequest method', () => {
    expect(Request.createXMLHttpRequest).toBeDefined();
    expect(typeof Request.createXMLHttpRequest).toBe('function');
  });

  it('should generate an XMLHttpRequest when passed a request object', () => {
    var request = {
      "method":"GET",
      "headers":[{"name":"test","value":"blah"}],
      "cache":false,
      "url":"http://www.aperturescience.com"
    };
    expect(Request.createXMLHttpRequest(request)).toEqual(jasmine.any(XMLHttpRequest));
  });

  // withCredentials means that setCookie headers in the response will send the set cookie
  // in subequent requests to that domain. This is useful for RESTful services behind
  // logins.
  it('should generate an XMLHttpRequest with "withCredentials" set', () => {
    var request = {
      "method":"GET",
      "headers":[{"name":"test","value":"blah"}],
      "cache":false,
      "url":"http://www.aperturescience.com"
    };
    expect(Request.createXMLHttpRequest(request).withCredentials).toEqual(true);
  });
});

