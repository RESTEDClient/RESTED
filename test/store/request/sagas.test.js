import Immutable from 'immutable';
import { put, call, apply, select } from 'redux-saga/effects';
import { change } from 'redux-form';
import 'whatwg-fetch';

import { requestForm } from 'components/Request';
import { fetchData, createResource, getUrl } from 'store/request/sagas';
import { getPlaceholderUrl } from 'store/request/selectors';
import { getUrlVariables } from 'store/urlVariables/selectors';
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
  const mockResponseData = {
    status : 200,
    statusText : "SuperSmashingGreat!",
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
      call(createResource, mockRequest)
    );
  });

  it('should push the history', () => {
    expect(iterator.next('foo').value).toEqual(
      put(pushHistory(Immutable.fromJS(mockRequest).set('url', 'foo'))),
    );
  });

  it('should fetch the resource', () => {
    const body = new FormData();
    body.append('Yes', 'Sir');

    expect(iterator.next().value).toEqual(
      call(fetch, 'foo', {
        method: 'GET',
        body,
        headers: new Headers({
          Foo: 'Bar',
        }),
        credentials: 'include',
      }),
    );
  });

  it('should get the response text', () => {
    expect(iterator.next(mockResponse).value).toEqual(
      apply(mockResponse, mockResponse.text),
    );
  });

  it('should dispatch a receiveResponse action', () => {
    expect(iterator.next().value).toEqual(put({
      type: types.RECEIVE_RESPONSE,
      response: {
        method: 'GET',
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
    const iterator = fetchData({ request: mockRequest })
    const error = { foo: 'bar' };
    iterator.next();

    expect(iterator.throw(error).value).toEqual(
      put({ type: types.REQUEST_FAILED, error })
    );
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
      call(getUrl, mockRequest)
    );
  });

  it('should fetch the urlVariables from the store', () => {
    expect(iterator.next(mockUrl).value).toEqual(
      select(getUrlVariables)
    );
  });

  it('should call prependHttp on the url', () => {
    expect(iterator.next(mockUrlVariables).value).toEqual(
      call(prependHttp, 'foo.com/bar')
    );
  });

  it('should return the resulting resource', () => {
    expect(iterator.next('http://foo.com/bar').value).toBe(
      'http://foo.com/bar'
    );
  });
});

describe('getUrl saga', () => {
  const iterator = getUrl({});
  const fallbackUrl = 'http://test.com';

  it('should return the URL on the request if present', () => {
    const iterator = getUrl(mockRequest);
    expect(iterator.next().value).toBe(mockRequest.url);
  });

  it('should getch the placeholderUrl from the store', () => {
    expect(iterator.next().value).toEqual(
      select(getPlaceholderUrl)
    );
  });

  it('should dispatch a URL change event to redux form', () => {
    expect(iterator.next(fallbackUrl).value).toEqual(
      put(change(requestForm, 'url', fallbackUrl))
    );
  });

  it('should return the fallbackUrl', () => {
    expect(iterator.next().value).toBe(fallbackUrl);
  });
});

