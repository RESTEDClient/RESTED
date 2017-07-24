import { getFormValues } from 'redux-form';

export const getPlaceholderUrl = state => state.request.placeholderUrl;
export const getResponse = state => state.request.response;
export const getInterceptedResponse = state => state.request.interceptedResponse;
export const getRedirectChain = state => state.request.redirectChain;
export const getLoading = state => state.request.loading;
export const getUseFormData = state => state.request.useFormData;

const getValues = getFormValues('request');
export const getBodyType = state => getValues(state).bodyType;
export const getHeaders = state => getValues(state).headers;

