import { createSelector } from 'reselect';

const configSelector = state => state.config;
const componentSelector = (state, props) => state.config[props.id];

export const isOpen = createSelector(
  componentSelector,
  config => config && config.expanded,
);

export const getEditingRequest = createSelector(
  configSelector,
  config => config && config.editingRequest,
);

export const isEditMode = createSelector(
  getEditingRequest,
  editingRequest => !!editingRequest,
);

