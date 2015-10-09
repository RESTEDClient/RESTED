'use strict';

describe('Service: RequestUtils', function () {

  // load the controller's module
  beforeEach(angular.mock.module('RestedApp'));

  // instantiate service
  var RequestUtils;
  beforeEach(inject(function (_RequestUtils_) {
    RequestUtils = _RequestUtils_;
  }));

  it('should load the service', function () {
    expect(!!RequestUtils).toBe(true);
  });

  it('should have a HAR import method', function () {
    expect(RequestUtils.fromHAR).toBeDefined();
  });
});

