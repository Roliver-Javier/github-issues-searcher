import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import Autocomplete from '../../components/autocomplete/autocomplete';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import TestRenderer from 'react-test-renderer';

configure({ adapter: new Adapter() });
const mockStore = configureStore([]);
const renderComponent = (store, props = {}) =>
  TestRenderer.create(
    <Provider store={store}>
      <Autocomplete {...props} />
    </Provider>
  ).toJSON();
const initialState = {
  issues: {
    data: [],
    dataFiltered: [],
    issueTyped: '',
  },
};
describe('autocomplete Component', () => {
  let store;
  let wrapper;
  let dispatchMock;
  beforeEach(() => {
    store = mockStore({
      ...initialState,
    });
    dispatchMock = jest.fn();
  });
  it('renders the autocomplete', () => {
    wrapper = renderComponent(store, {
      dispatch: dispatchMock,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
