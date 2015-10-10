'use strict';

describe('Service: Base64', function () {

  // load the controller's module
  beforeEach(angular.mock.module('RestedApp'));

  // instantiate service
  var Base64;
  beforeEach(inject(function (_Base64_) {
    Base64 = _Base64_;
  }));

  it('should load the service', function () {
    expect(!!Base64).toBe(true);
  });

  it('should have an encode function', function () {
    expect(Base64.encode).toBeDefined();
    expect(typeof Base64.encode).toBe('function');
  });

  it('should properly calculate base64 values', function () {
    expect(Base64.encode('teststring')).toBe('dGVzdHN0cmluZw==');
    expect(Base64.encode('RESTEDapp')).toBe('UkVTVEVEYXBw');
    expect(Base64.encode('What is the average air speed velocity of an African swallow')).toBe('V2hhdCBpcyB0aGUgYXZlcmFnZSBhaXIgc3BlZWQgdmVsb2NpdHkgb2YgYW4gQWZyaWNhbiBzd2FsbG93');
  });
});
