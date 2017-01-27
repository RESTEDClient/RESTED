import { createSelector } from 'reselect';

const historyFilter = state => state.history;

export const getHistory = createSelector(
  [historyFilter],
  history => history.get('data'),
);

