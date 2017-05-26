import {
  SET_EXPANDED,
  SET_COLLAPSED,
  TOGGLE_EDIT,
} from './types';

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

    case TOGGLE_EDIT:
      return Object.assign({}, state, {
        editingRequest: !state.editingRequest ? action.request : undefined,
      });

    default:
      return state;
  }
}

