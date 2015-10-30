'use strict';

describe('Service: RequestUtils', function () {

  // load the controller's module
  beforeEach(angular.mock.module('RestedApp'));

  var object = {
    headerName: 'value'
  };

  var array = [
    {
      headerName: 'headerName',
      value: 'value'
    }
  ];

  // instantiate service
  var RequestUtils;
  beforeEach(inject(function (_RequestUtils_) {
    RequestUtils = _RequestUtils_;
  }));

  it('should load the service', function () {
    expect(!!RequestUtils).toBe(true);
  });

  it('should have a reMapHeaders method', function () {
    expect(RequestUtils.reMapHeaders).toBeDefined();
    expect(typeof RequestUtils.reMapHeaders).toBe('function');
  });

  it('should reMap from object to array', function () {
    expect(RequestUtils.reMapHeaders(object, false)).toBeDefined(array);
  });

  it('should reMap from array to object', function () {
    expect(RequestUtils.reMapHeaders(array, true)).toBeDefined(object);
  });

  /* formDataToFormString tests */
  it('should have a formDataToFormString method', function () {
    expect(RequestUtils.formDataToFormString).toBeDefined();
    expect(typeof RequestUtils.formDataToFormString).toBe('function');
  });

  it('should properly map from formData array to string', function () {
    expect(RequestUtils.formDataToFormString(null)).toBe('');
    expect(RequestUtils.formDataToFormString(undefined)).toBe('');
    expect(RequestUtils.formDataToFormString([])).toBe('');
    expect(RequestUtils.formDataToFormString([{ name: 'Content-Type', value: 'test123' }])).toBe('Content-Type=test123');
    expect(RequestUtils.formDataToFormString([{ name: 'Some-Test', value: 'test123' }])).toBe('Some-Test=test123');

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
    expect(RequestUtils.formDataToFormString(complexRequest)).toBe(complexResult);
  });

  it('should cover corner cases like special characters and spaces', function () {
    expect(RequestUtils.formDataToFormString([{ name: '', value: '{€$@¡¡@"' }])).toBe('');
    expect(RequestUtils.formDataToFormString([{ name: '$o114$o114Bi11z', value: '{€$@¡¡@"' }])).toBe('%24o114%24o114Bi11z=%7B%E2%82%AC%24%40%C2%A1%C2%A1%40%22');
    expect(RequestUtils.formDataToFormString([{ name: 'E!xclamation(Mark)', value: '***' }])).toBe('E%21xclamation%28Mark%29=%2a%2a%2a');
  });

  it('should not prefix & when passed empty objects', function () {
    expect(RequestUtils.formDataToFormString([{}, {}, {}, { name: '$o114$o114Bi11z', value: '{€$@¡¡@"' } ])).toBe('%24o114%24o114Bi11z=%7B%E2%82%AC%24%40%C2%A1%C2%A1%40%22');
  });
});

