import { createSelector } from 'reselect';

const optionsSelector = state => state.options;

export const getActiveTab = createSelector(
  [optionsSelector],
  options => options && options.getIn(['options', 'activeTab'], 'collections'),
);

export const getTheme = createSelector(
  [optionsSelector],
  options => options && options.getIn(['options', 'theme'], 'retro'),
);

export const getCollectionsMinimized = createSelector(
  [optionsSelector],
  options => options && options.getIn(['options', 'collectionsMinimized'], false),
);

