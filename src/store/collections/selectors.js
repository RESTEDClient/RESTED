import { createSelector } from 'reselect';

const collectionsSelector = state => state.collections;

export const getCollections = createSelector(
  collectionsSelector,
  collections => collections.get('collections')
);

export const collectionsAreFetching = createSelector(
  collectionsSelector,
  collections => collections.get('isFetching')
);

