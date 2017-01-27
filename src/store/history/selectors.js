import { createSelector } from 'reselect';

const historyFilter = state => state.history;

// eslint-disable-next-line import/prefer-default-export
export const getHistory = createSelector(
  [historyFilter],
  history => history.get('data'),
);

