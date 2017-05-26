import { getFormValues } from 'redux-form';

export const getPlaceholderUrl = state => state.request.placeholderUrl;
export const getResponse = state => state.request.response;
export const getLoading = state => state.request.loading;

const getValues = getFormValues('request');
export const getBodyType = state => getValues(state).bodyType;
export const getHeaders = state => getValues(state).headers;

