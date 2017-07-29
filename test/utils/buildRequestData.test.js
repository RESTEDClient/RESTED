import buildRequestData from 'utils/buildRequestData';

describe('buildRequestData util', () => {
  it('should build a multipart body', () => {
    const formData = [{
      name: 'foo',
      value: 'bar',
    }, {
      name: 'wasm',
      value: 'awesome',
    }];
    const result = buildRequestData('multipart', formData);

    expect(result).toBeDefined();
    expect(result.has('foo')).toBe(true);
    expect(result.get('foo')).toBe('bar');
    expect(result.has('wasm')).toBe(true);
    expect(result.get('wasm')).toBe('awesome');
  });

  it('should bould a urlencoded body', () => {
    const formData = [{
      name: 'foo',
      value: 'bar',
    }, {
      name: 'wasm',
      value: 'awesome',
    }];
    const result = buildRequestData('urlencoded', formData);

    expect(result).toBeDefined();
    expect(result).toBe('foo=bar&wasm=awesome');
  });

  it('should bould a json body', () => {
    const formData = [{
      name: 'foo',
      value: 'bar',
    }, {
      name: 'wasm',
      value: 'awesome',
    }];
    const result = buildRequestData('json', formData);

    expect(result).toBeDefined();
    expect(result).toBe('{"foo":"bar","wasm":"awesome"}');
  });

  it('should return null otherwise', () => {
    expect(buildRequestData(null, null)).toBe(null);
    expect(buildRequestData('multipart', null)).toBe(null);
    expect(buildRequestData('urlencoded', null)).toBe(null);
    expect(buildRequestData('json', null)).toBe(null);
  });
});

