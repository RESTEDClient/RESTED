import * as Import from 'utils/import';

describe('Service: Import', () => {

  var expectedResult;

  beforeEach(() => {
    expectedResult = [
      {
        url: 'www.vg.no',
        method: 'GET',
        data: undefined,
        headers: [
          {
            name: 'Content-Type',
            value: 'angular/awesomeness'
          }
        ]
      }
    ];
  });

  it('should load the service', () => {
    expect(!!Import).toBe(true);
  });

  it('should have a HAR import method', () => {
    expect(Import.fromHAR).toBeDefined();
    expect(typeof Import.fromHAR).toBe('function');
  });

  it('should have a Postman import method', () => {
    expect(Import.fromPostman).toBeDefined();
    expect(typeof Import.fromPostman).toBe('function');
  });

  it('should convert HAR to correct format when invoked', () => {
    var HAR = {
      "log": {
        "entries": [
          {
            "request": {
              "method": "GET",
              "url": "www.vg.no",
              "headers": [
                {
                  "name": "Content-Type",
                  "value": "angular/awesomeness"
                }
              ]
            }
          }
        ]
      }
    };
    expect(Import.fromHAR(HAR)).toEqual(expectedResult);
  });

  it('should convert HAR and include postData', () => {
    var HAR = {
      "log": {
        "entries": [
          {
            "request": {
              "method": "GET",
              "url": "www.vg.no",
              "headers": [
                {
                  "name": "Content-Type",
                  "value": "angular/awesomeness"
                }
              ],
              "postData": {
                "mimeType": "application/x-www-form-urlencoded",
                "params": [
                  {
                    "name": "a",
                    "value": "b"
                  },
                  {
                    "name": "c",
                    "value": "d"
                  }
                ],
                "text": "username=admin&password=awesome"
              }
            }
          }
        ]
      }
    };
    expectedResult[0].data = 'username=admin&password=awesome',
    expect(Import.fromHAR(HAR)).toEqual(expectedResult);
  });

  it('should convert Postman json to correct format when invoked', () => {
    var postmanJson = {
      "name": "Test collection",
      "requests": [
        {
          "headers": "Content-Type: angular/awesomeness\n",
          "url": "www.vg.no",
          "method": "GET"
        }
      ],
    };
    expect(Import.fromPostman(postmanJson)).toEqual(expectedResult);
  });

  it('should convert Postman json and include postData', () => {
    var postmanJson = {
      "name": "Test collection",
      "requests": [
        {
          "headers": "Content-Type: angular/awesomeness\n",
          "url": "www.vg.no",
          "method": "GET",
          "data": [
            {
              "key": "username",
              "value": "admin",
              "type": "text",
              "enabled": true
            },
            {
              "key": "password",
              "value": "awesome",
              "type": "text",
              "enabled": true
            }
          ]
        }
      ],
    };
    expectedResult[0].data = 'username=admin&password=awesome',
    expect(Import.fromPostman(postmanJson)).toEqual(expectedResult);
  });

});
