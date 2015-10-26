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

  /* formDataToFormString tests */
  it('should have a formDataToFormString method', function () {
    expect(Request._formDataToFormString).toBeDefined();
    expect(typeof Request._formDataToFormString).toBe('function');
  });

  it('should properly map from formData array to string', function () {
    expect(Request._formDataToFormString(null)).toBe('');
    expect(Request._formDataToFormString(undefined)).toBe('');
    expect(Request._formDataToFormString([])).toBe('');
    expect(Request._formDataToFormString([{ name: 'Content-Type', value: 'test123' }])).toBe('Content-Type=test123');
    expect(Request._formDataToFormString([{ name: 'Some-Test', value: 'test123' }])).toBe('Some-Test=test123');

    var complexRequest = [{
      name: 'logfile',
      value: 'blabla'
    }, {
      name: 'configfile',
      value: 'more blabla'
    }, {
      name: 'usercomment',
      value: 'hello'
    }, {
      name: 'useremail',
      value: ''
    }];
    var complexResult = 'logfile=blabla&configfile=more+blabla&usercomment=hello&useremail=';
    expect(Request._formDataToFormString(complexRequest)).toBe(complexResult);
  });

  it('should cover corner cases like special characters and spaces', function () {
    expect(Request._formDataToFormString([{ name: '', value: '{€$@¡¡@"' }])).toBe('');
    expect(Request._formDataToFormString([{ name: '$o114$o114Bi11z', value: '{€$@¡¡@"' }])).toBe('%24o114%24o114Bi11z=%7B%E2%82%AC%24%40%C2%A1%C2%A1%40%22');
    expect(Request._formDataToFormString([{ name: 'E!xclamation(Mark)', value: '***' }])).toBe('E%21xclamation%28Mark%29=%2a%2a%2a');
  });

  it('should not prefix & when passed empty objects', function () {
    expect(Request._formDataToFormString([{}, {}, {}, { name: '$o114$o114Bi11z', value: '{€$@¡¡@"' } ])).toBe('%24o114%24o114Bi11z=%7B%E2%82%AC%24%40%C2%A1%C2%A1%40%22');
  });
});

