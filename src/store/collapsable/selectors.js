import { createSelector } from 'reselect';

const collapsableSelector = (state, props) => state.collapsable[props.id];

/* eslint-disable import/prefer-default-export */
export const isOpen = createSelector(
  collapsableSelector,
  collapsable => collapsable && collapsable.expanded,
);

