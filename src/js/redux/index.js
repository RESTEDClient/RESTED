import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import request from './request/reducer';

export default combineReducers({
  request,
  form,
});

