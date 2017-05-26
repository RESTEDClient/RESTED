import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import request from './request/reducer';
import config from './config/reducer';
import collections from './collections/reducer';
import history from './history/reducer';
import modal from './modal/reducer';
import options from './options/reducer';
import urlVariables from './urlVariables/reducer';

export default combineReducers({
  request,
  config,
  collections,
  history,
  modal,
  options,
  urlVariables,
  form,
});

