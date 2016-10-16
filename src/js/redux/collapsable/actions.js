export const SET_EXPANDED = 'collapsable/SET_EXPANDED';
export function expand(id) {
  return { type: SET_EXPANDED, id };
}

export const SET_COLLAPSED = 'Collapsable/SET_COLLAPSED';
export function collapse(id) {
  return { type: SET_COLLAPSED, id };
}

