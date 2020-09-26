import { SET_THEME, SET_TOGGLE_CHECKED } from '../types';

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

export const toggleChecked = () => ({
  type: SET_TOGGLE_CHECKED,
});
