import React from 'react';
import { checkPropTypes } from 'prop-types';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

export const checkProps = (component, expectedProps) => {
  const propsErr = checkPropTypes(
    component.propTypes,
    expectedProps,
    'props',
    component.name
  );
  return propsErr;
};

export const renderWithRedux = (component, reducer, initialState) => {
  const store = createStore(reducer, initialState);
  return {
    ...shallow(<Provider store={store}>{component}</Provider>),
  };
};
