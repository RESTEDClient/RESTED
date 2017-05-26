/* eslint-disable import/no-unresolved */
import * as Request from 'utils/request';

describe('Request', () => {
  it('should load the service', () => {
    expect(Request).toBeDefined();
  });

  /* prependHttp tests */
  it('should have a prependHttp method', () => {
    expect(Request.prependHttp).toBeDefined();
    expect(typeof Request.prependHttp).toBe('function');
  });

  it('should prepend http when appropriate', () => {
    const goodUrl = 'http://vg.no';
    expect(Request.prependHttp(goodUrl)).toEqual(goodUrl);

    const badUrl = 'vg.no';
    expect(Request.prependHttp(badUrl)).toEqual(`http://${badUrl}`);

    const httpsUrl = 'https://vg.no';
    expect(Request.prependHttp(httpsUrl)).toEqual(httpsUrl);
  });

  /* mapParameters tests */
  it('should have a mapParameters method', () => {
    expect(Request.mapParameters).toBeDefined();
    expect(Request.mapParameters).toBeInstanceOf(Function);
  });

  it('should have a map parameters to a url template', () => {
    const plainUrl = 'http://www.reddit.com/r/aww?questonmark=equals-sign&ampersand=';
    expect(Request.mapParameters(plainUrl)).toEqual(plainUrl);

    const params = {
      key: 'value',
      STATIC_KEY: 'EuR_ek44!\\',
    };
    const templateUrl = 'http://someapi.com?API_KEY={{key}}&{{STATIC_KEY}}=why';
    const result = 'http://someapi.com?API_KEY=value&EuR_ek44!\\=why';
    expect(Request.mapParameters(templateUrl, params)).toEqual(result);
  });
});

