import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import request from './request/reducer';
import collapsable from './collapsable/reducer';
import collections from './collections/reducer';

export default combineReducers({
  request,
  collapsable,
  collections,
  form,
});

