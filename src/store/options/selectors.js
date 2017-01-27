import { createSelector } from 'reselect';

const optionsSelector = state => state.options;

/* eslint-disable import/prefer-default-export */
export const getActiveTab = createSelector(
  [optionsSelector],
  options => options && options.getIn(['options', 'activeTab'], 'collections'),
);

