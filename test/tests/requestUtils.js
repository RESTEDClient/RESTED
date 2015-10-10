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
});

