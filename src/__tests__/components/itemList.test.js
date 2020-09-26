import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import ItemList from '../../pages/homePage/components/itemList/itemList';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import TestRenderer from 'react-test-renderer';
import { mockData } from '../../../utils';
configure({ adapter: new Adapter() });

const initialState = {
  issues: {
    issueSelected: { ...mockData.issueSelected },
  },
};

const mockStore = configureStore([]);
const renderComponent = (store, props = {}) =>
  TestRenderer.create(
    <Provider store={store}>
      <ItemList {...props} />
    </Provider>
  ).toJSON();

describe('itemList Component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      ...initialState,
    });
  });
  it('renders the itemList', () => {
    const dispatchMock = jest.fn();

    const wrapper = renderComponent(store, { dispatch: dispatchMock });
    expect(wrapper).toMatchSnapshot();
  });

  it('should have data at dataFiltered', () => {
    const state = store.getState();
    expect(state.issues.issueSelected).not.toBeUndefined();
  });
});
