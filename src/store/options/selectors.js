import { createSelector } from 'reselect';

export const getOptions = state => state.options;

export const getActiveTab = createSelector(
  [getOptions],
  options => options && options.getIn(['options', 'activeTab'], 'collections'),
);

export const getTheme = createSelector(
  [getOptions],
  options => options && options.getIn(['options', 'theme'], 'retro'),
);

export const getHighlightStyle = createSelector(
  [getOptions],
  options => options && options.getIn(['options', 'highlightStyle'], 'default'),
);

export const getCollectionsMinimized = createSelector(
  [getOptions],
  options => options && options.getIn(['options', 'collectionsMinimized'], false),
);

export const getHistorySize = createSelector(
  [getOptions],
  options => options && options.getIn(['options', 'historySize'], 10),
);

export const isDisabledHighlighting = createSelector(
  [getOptions],
  options => options && options.getIn(['options', 'disableHighlighting'], false),
);

export const isWrapResponse = createSelector(
  [getOptions],
  options => options && options.getIn(['options', 'wrapResponse'], false),
);
