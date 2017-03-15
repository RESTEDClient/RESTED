import Immutable from 'immutable';
import { put, call, apply, select } from 'redux-saga/effects';
import { change } from 'redux-form';
import 'whatwg-fetch';

import { requestForm } from 'components/Request';
import { fetchData, createResource, buildHeaders, getParameters, getUrl, getBeforeTime, getMillisPassed } from 'store/request/sagas';
import { getPlaceholderUrl } from 'store/request/selectors';
import { pushHistory } from 'store/history/actions';
import * as types from 'store/request/types';
import { prependHttp } from 'utils/request';

const mockRequest = {
  method: 'GET',
  url: 'http://visitnorway.com',
  headers: [{
    name: 'Foo',
    value: 'Bar',
  }],
  formData: [{
    name: 'Yes',
    value: 'Sir',
  }],
};

describe('fetchData saga', () => {
  const mockHeaders = new Headers({
    Foo: 'Bar',
  });
  const mockResponseData = {
    status: 200,
    statusText: 'SuperSmashingGreat!',
    headers: new Headers({
      Header: 'Value',
    }),
  };
  const mockResponse = new Response(new Blob(), mockResponseData);

  const iterator = fetchData({ request: mockRequest });

  it('should dispatch an executeRequest action', () => {
    expect(iterator.next().value).toEqual(put({
      type: types.EXECUTE_REQUEST,
    }));
  });

  it('should call createResource to build a URL', () => {
    expect(iterator.next().value).toEqual(
      call(createResource, mockRequest),
    );
  });

  it('should call buildHeaders to prepare the header set', () => {
    expect(iterator.next('foo').value).toEqual(
      call(buildHeaders, mockRequest),
    );
  });

  it('should push the history', () => {
    expect(iterator.next(mockHeaders).value).toEqual(
      put(pushHistory(Immutable.fromJS(mockRequest)
        .set('url', 'foo')
        .set('id', 'test-UUID'),
      )),
    );
  });

  let timeBefore;
  it('should calculate the time passed', () => {
    timeBefore = Date.now();
    expect(iterator.next().value).toEqual(
      call(getBeforeTime),
    );
  });

  it('should fetch the resource', () => {
    const body = new FormData();
    body.append('Yes', 'Sir');

    expect(iterator.next(timeBefore).value).toEqual(
      call(fetch, 'foo', {
        method: 'GET',
        body,
        redirect: 'follow',
        headers: new Headers({
          Foo: 'Bar',
        }),
        credentials: 'include',
      }),
    );
  });

  const timePassed = 1337;
  it('should calculate the time passed', () => {
    expect(iterator.next(mockResponse).value).toEqual(
      call(getMillisPassed, timeBefore),
    );
  });

  it('should get the response text', () => {
    expect(iterator.next(timePassed).value).toEqual(
      apply(mockResponse, mockResponse.text),
    );
  });

  it('should dispatch a receiveResponse action', () => {
    expect(iterator.next().value).toEqual(put({
      type: types.RECEIVE_RESPONSE,
      response: {
        method: 'GET',
        time: timePassed,
        url: mockResponse.url,
        body: undefined,
        status: mockResponse.status,
        statusText: mockResponse.statusText,
        headers: [{
          name: 'header',
          value: 'Value',
        }],
      },
    }));
  });

  it('should dispatch a requestFailed when something throws', () => {
    const iterator2 = fetchData({ request: mockRequest });
    const error = { foo: 'bar' };
    iterator2.next();

    expect(iterator2.throw(error).value).toEqual(
      put({ type: types.REQUEST_FAILED, error }),
    );
  });

  it('should be done', () => {
    expect(iterator.next().done).toEqual(true);
  });
});

describe('createResource saga', () => {
  const iterator = createResource(mockRequest);
  const mockUrl = 'foo.com/{{foo}}';
  const mockUrlVariables = {
    foo: 'bar',
  };

  it('should call getUrl with the request', () => {
    expect(iterator.next().value).toEqual(
      call(getUrl, mockRequest),
    );
  });

  it('should call getParameters to get the urlVariables', () => {
    expect(iterator.next(mockUrl).value).toEqual(
      call(getParameters),
    );
  });

  it('should call prependHttp on the url', () => {
    expect(iterator.next(mockUrlVariables).value).toEqual(
      call(prependHttp, 'foo.com/bar'),
    );
  });

  it('should return the resulting resource', () => {
    expect(iterator.next('http://foo.com/bar').value).toBe(
      'http://foo.com/bar',
    );
  });

  it('should be done', () => {
    expect(iterator.next().done).toEqual(true);
  });
});

describe('getUrl saga', () => {
  const iterator = getUrl({});
  const fallbackUrl = 'http://test.com';

  it('should return the URL on the request if present', () => {
    const iterator2 = getUrl(mockRequest);
    expect(iterator2.next().value).toBe(mockRequest.url);
  });

  it('should getch the placeholderUrl from the store', () => {
    expect(iterator.next().value).toEqual(
      select(getPlaceholderUrl),
    );
  });

  it('should dispatch a URL change event to redux form', () => {
    expect(iterator.next(fallbackUrl).value).toEqual(
      put(change(requestForm, 'url', fallbackUrl)),
    );
  });

  it('should return the fallbackUrl', () => {
    expect(iterator.next().value).toBe(fallbackUrl);
  });

  it('should be done', () => {
    expect(iterator.next().done).toEqual(true);
  });
});

