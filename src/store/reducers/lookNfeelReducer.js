import { SET_THEME, SET_TOGGLE_CHECKED } from '../types';

const initialState = {
  theme: 'light',
  toggleCheck: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    case SET_TOGGLE_CHECKED:
      return {
        ...state,
        toggleCheck: !state.toggleCheck,
      };

    default:
      return state;
  }
};
