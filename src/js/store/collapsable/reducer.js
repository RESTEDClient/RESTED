import {
  SET_EXPANDED,
  SET_COLLAPSED,
} from './actions';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_EXPANDED:
      return Object.assign({}, state, {
        [action.id]: {
          expanded: true,
        },
      });

    case SET_COLLAPSED:
      return Object.assign({}, state, {
        [action.id]: {
          expanded: false,
        },
      });

    default:
      return state;
  }
}

