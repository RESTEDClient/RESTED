'use strict';

describe('Service: Request', function () {

  // load the controller's module
  beforeEach(angular.mock.module('RestedApp'));

  // instantiate service
  var Request;
  beforeEach(inject(function (_Request_) {
    Request = _Request_;
  }));

  it('should load the service', function () {
    expect(!!Request).toBe(true);
  });

  it('should have a run method', function () {
    expect(Request.run).toBeDefined();
    expect(typeof Request.run).toBe('function');
  });

  /* prependHttp tests */
  it('should have a prependHttp method', function () {
    expect(Request._prependHttp).toBeDefined();
    expect(typeof Request._prependHttp).toBe('function');
  });

  it('should prepend http when appropriate', function () {
    var goodUrl = 'http://vg.no';
    expect(Request._prependHttp(goodUrl)).toEqual(goodUrl);

    var badUrl = 'vg.no';
    expect(Request._prependHttp(badUrl)).toEqual('http://' + badUrl);

    var httpsUrl = 'https://vg.no';
    expect(Request._prependHttp(httpsUrl)).toEqual(httpsUrl);
  });

  /* mapParameters tests */
  it('should have a mapParameters method', function () {
    expect(Request._mapParameters).toBeDefined();
    expect(typeof Request._mapParameters).toBe('function');
  });

  it('should have a map parameters to a url template', function () {
    var plainUrl = 'http://www.reddit.com/r/aww?questonmark=equals-sign&ampersand=';
    expect(Request._mapParameters(plainUrl)).toEqual(plainUrl);

    var params = {
      key: 'value',
      'STATIC_KEY': 'EuR_ek44!\\'
    };
    var templateUrl = 'http://someapi.com?API_KEY={{key}}&{{STATIC_KEY}}=why';
    var result      = 'http://someapi.com?API_KEY=value&EuR_ek44!\\=why';
    expect(Request._mapParameters(templateUrl, params)).toEqual(result);
  });

  /* createXMLHttpRequest tests */
  it('should have a createXMLHttpRequest method', function () {
    expect(Request._createXMLHttpRequest).toBeDefined();
    expect(typeof Request._createXMLHttpRequest).toBe('function');
  });

  it('should generate an XMLHttpRequest when passed a request object', function () {
    var request = {
      "method":"GET",
      "headers":[{"name":"test","value":"blah"}],
      "cache":false,
      "url":"http://www.aperturescience.com"
    };
    expect(Request._createXMLHttpRequest(request)).toEqual(jasmine.any(XMLHttpRequest));
  });

  // withCredentials means that setCookie headers in the response will send the set cookie
  // in subequent requests to that domain. This is useful for RESTful services behind
  // logins.
  it('should generate an XMLHttpRequest with "withCredentials" set', function () {
    var request = {
      "method":"GET",
      "headers":[{"name":"test","value":"blah"}],
      "cache":false,
      "url":"http://www.aperturescience.com"
    };
    expect(Request._createXMLHttpRequest(request).withCredentials).toEqual(true);
  });
});

