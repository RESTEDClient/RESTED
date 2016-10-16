import {
  SET_MODAL_DATA,
  REMOVE_MODAL,
  THROW_ERROR,
} from './actions';

const initialState = {
  title: null,
  body: null,
  errorData: null,
  visible: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MODAL_DATA:
      return Object.assign({}, state, {
        title: action.data.title,
        body: action.data.body,
        errorData: null,
        visible: true,
      });

    case REMOVE_MODAL:
      return initialState;

    case THROW_ERROR:
      return Object.assign({}, state, {
        title: 'Error!',
        errorData: action.data,
        body: 'Sorry, something went wrong.. If there is anything useful in ' +
          'a gray box below (or the web console), please create an issue on ' +
          '<a href="https://github.com/esphen/RESTED/issues" target="_blank">GitHub</a> ' +
          'with any relevant data you find. Remember to remove any sensitive ' +
          'data before posting.',
        visible: true,
      });

    default:
      return state;
  }
}

