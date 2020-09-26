import { SET_THEME, SET_TOGGLE_CHECKED } from '../../store/types';
import lookNfeelReducer from '../../store/reducers/lookNfeelReducer';

describe('Issues Reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      theme: 'light',
      toggleCheck: false,
    };
  });
  it('Should return default state', () => {
    const newState = lookNfeelReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it('Should return light theme state if receiving type', () => {
    const data = { type: SET_THEME, payload: 'light' };
    const newState = lookNfeelReducer(initialState, data);
    expect(newState.theme).toEqual(data.payload);
  });
  it('Should return dark theme state if receiving type', () => {
    const data = { type: SET_THEME, payload: 'dark' };
    const newState = lookNfeelReducer(initialState, data);
    expect(newState.theme).toEqual(data.payload);
  });

  it('Should return toggle checked state to true if receiving type', () => {
    const data = { type: SET_TOGGLE_CHECKED };
    const newState = lookNfeelReducer(initialState, data);
    expect(newState.toggleCheck).toEqual(true);
  });

  it('Should return toggle checked state to false if receiving type', () => {
    const data = { type: SET_TOGGLE_CHECKED };
    initialState = { ...initialState, toggleCheck: true };
    const newState = lookNfeelReducer(initialState, data);
    expect(newState.toggleCheck).toEqual(false);
  });
});
