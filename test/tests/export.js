'use strict';

describe('Service: Export', function () {

  // load the controller's module
  beforeEach(angular.mock.module('RestedApp'));

  var dataset;

  // instantiate service
  var Export;
  beforeEach(inject(function (_Export_) {
    Export = _Export_;
    dataset = [
      {
        url: 'www.vg.no',
        method: 'GET',
        postData: {},
        headers: [
          {
            name: 'Content-Type',
            value: 'angular/awesomeness'
          }
        ]
      }
    ];
  }));

  it('should load the service', function () {
    expect(!!Export).toBe(true);
  });

  it('should have a HAR export method', function () {
    expect(Export.toHAR).toBeDefined();
    expect(typeof Export.toHAR).toBe('function');
  });

  it('should have a Postman export method', function () {
    expect(Export.toPostman).toBeDefined();
    expect(typeof Export.toPostman).toBe('function');
  });

  it('should convert HAR to correct format when invoked', function () {
    var HAR = {
      "log": {
        "entries": [
          {
            "request": {
              "method": "GET",
              "url": "www.vg.no",
              "postData": {},
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
    expect(Export.toHAR(dataset)).toEqual(HAR);
  });

  it('should convert to HAR using raw postData', function () {
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
                "mimeType": "",
                "text": "username=admin&password=awesome",
                "params": []
              }
            }
          }
        ]
      }
    };
    dataset[0].data = 'username=admin&password=awesome',
    expect(Export.toHAR(dataset)).toEqual(HAR);
  });

  it('should convert to HAR using formData', function() {
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
                    "name": "username",
                    "value": "admin"
                  },
                  {
                    "name": "password",
                    "value": "awesome"
                  }
                ],
                "text": "username=admin&password=awesome"
              }
            }
          }
        ]
      }
    };
    dataset[0].formData = [{
      name: 'username',
      value: 'admin'
    }, {
      name: 'password',
      value: 'awesome'
    }];
    expect(Export.toHAR(dataset)).toEqual(HAR);
  });

  it('should convert Postman json to correct format when invoked', function () {
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
    expect(Export.toPostman(dataset)).toEqual(postmanJson);
  });

  it('should convert Postman json and include postData', function () {
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
    dataset[0].data = 'username=admin&password=awesome',
    expect(Export.toPostman(dataset)).toEqual(postmanJson);
  });

});
