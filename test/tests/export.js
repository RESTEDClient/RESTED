'use strict';

describe('Service: Export', function () {

  // load the controller's module
  beforeEach(angular.mock.module('RestedApp'));

  var dataset;
  var collection;

  // instantiate service
  var Export;
  beforeEach(inject(function (_Export_) {
    Export = _Export_;
    dataset = [
      {
        id: 'requestId',
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
    collection = {
      id: "collectionId",
      name: "Test collection",
    };
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

  it('should export to HAR with correct format when invoked', function () {
    var HAR = {
      "log": {
        "version": "1.2",
        "creator": "RESTED REST Client",
        "Comment": "An exported collection from RESTED",
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

  it('should export to HAR using raw postData', function () {
    var HAR = {
      "log": {
        "version": "1.2",
        "creator": "RESTED REST Client",
        "Comment": "An exported collection from RESTED",
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

  it('should export to HAR using formData', function() {
    var HAR = {
      "log": {
        "version": "1.2",
        "creator": "RESTED REST Client",
        "Comment": "An exported collection from RESTED",
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

  it('should export to Postman json when invoked', function () {
    var postmanJson = {
      "id": "collectionId",
      "name": "Test collection",
      "requests": [
        {
          "id": "requestId",
          "collectionId": "collectionId",
          "headers": "Content-Type: angular/awesomeness\n",
          "url": "www.vg.no",
          "method": "GET",
          "dataMode": "raw",
          "data": [],
          "rawModeData": [],
        }
      ],
    };
    expect(Export.toPostman(dataset, collection)).toEqual(postmanJson);
  });

  it('should export to Postman json using raw postData', function () {
    var postmanJson = {
      "id": "collectionId",
      "name": "Test collection",
      "requests": [
        {
          "id": "requestId",
          "collectionId": "collectionId",
          "headers": "Content-Type: angular/awesomeness\n",
          "url": "www.vg.no",
          "method": "GET",
          "rawModeData": [],
          "dataMode": "params",
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
    dataset[0].formData = [{
      name: 'username',
      value: 'admin'
    }, {
      name: 'password',
      value: 'awesome'
    }];
    expect(Export.toPostman(dataset, collection)).toEqual(postmanJson);
  });

  it('should export to Postman json using formData', function () {
    var postmanJson = {
      "id": "collectionId",
      "name": "Test collection",
      "requests": [
        {
          "id": "requestId",
          "collectionId": "collectionId",
          "headers": "Content-Type: angular/awesomeness\n",
          "url": "www.vg.no",
          "method": "GET",
          "dataMode": "raw",
          "rawModeData": 'username=admin&password=awesome',
          "data": [],
        }
      ],
    };
    dataset[0].data = 'username=admin&password=awesome',
    expect(Export.toPostman(dataset, collection)).toEqual(postmanJson);
  });

});
