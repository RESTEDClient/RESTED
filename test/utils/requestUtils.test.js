import * as RequestUtils from 'utils/requestUtils';

describe('Service: RequestUtils', () => {

  var object = {
    headerName: 'value'
  };

  var array = [
    {
      name: 'headerName',
      value: 'value'
    }
  ];

  it('should load the service', () => {
    expect(RequestUtils).toBeDefined();
  });

  it('should have a reMapHeaders method', () => {
    expect(RequestUtils.reMapHeaders).toBeDefined();
    expect(typeof RequestUtils.reMapHeaders).toBe('function');
  });

  it('should reMap from object to array', () => {
    expect(RequestUtils.reMapHeaders(object, false)).toEqual(array);
  });

  it('should reMap from array to object', () => {
    expect(RequestUtils.reMapHeaders(array, true)).toEqual(object);
  });

  /* formDataToFormString tests */
  it('should have a formDataToFormString method', () => {
    expect(RequestUtils.formDataToFormString).toBeDefined();
    expect(typeof RequestUtils.formDataToFormString).toBe('function');
  });

  it('should properly map from formData array to string', () => {
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

  it('should cover corner cases like special characters and spaces', () => {
    expect(RequestUtils.formDataToFormString([{ name: '', value: '{€$@¡¡@"' }])).toBe('');
    expect(RequestUtils.formDataToFormString([{ name: '$o114$o114Bi11z', value: '{€$@¡¡@"' }])).toBe('%24o114%24o114Bi11z=%7B%E2%82%AC%24%40%C2%A1%C2%A1%40%22');
    expect(RequestUtils.formDataToFormString([{ name: 'E!xclamation(Mark)', value: '***' }])).toBe('E%21xclamation%28Mark%29=%2a%2a%2a');
  });

  it('should not prefix & when passed empty objects', () => {
    expect(RequestUtils.formDataToFormString([{}, {}, {}, { name: '$o114$o114Bi11z', value: '{€$@¡¡@"' } ])).toBe('%24o114%24o114Bi11z=%7B%E2%82%AC%24%40%C2%A1%C2%A1%40%22');
  });
});

