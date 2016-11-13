import {
  SET_EXPANDED,
  SET_COLLAPSED,
} from './types';

export function expand(id) {
  return { type: SET_EXPANDED, id };
}

export function collapse(id) {
  return { type: SET_COLLAPSED, id };
}

export function toggleCollapse(id, isOpen) {
  if (isOpen) {
    return collapse(id);
  }

  return expand(id);
}
