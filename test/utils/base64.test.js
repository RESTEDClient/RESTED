/* eslint-disable import/no-unresolved */
import encode from 'utils/base64';

describe('base64', () => {
  it('should load the service', () => {
    expect(encode).toBeDefined();
  });

  it('should have an encode function', () => {
    expect(encode).toBeDefined();
    expect(typeof encode).toBe('function');
  });

  it('should properly calculate base64 values', () => {
    expect(encode('teststring')).toBe('dGVzdHN0cmluZw==');
    expect(encode('RESTEDapp')).toBe('UkVTVEVEYXBw');
    expect(encode('What is the average air speed velocity of an African swallow')).toBe('V2hhdCBpcyB0aGUgYXZlcmFnZSBhaXIgc3BlZWQgdmVsb2NpdHkgb2YgYW4gQWZyaWNhbiBzd2FsbG93');
  });
});

