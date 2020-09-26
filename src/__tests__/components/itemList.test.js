import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import ItemList from '../../pages/homePage/components/itemList/itemList';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });

const data = {
  title: 'Remove disableSchedulerTimeoutInWorkLoop flag',
  labels: [
    {
      id: 196858374,
      node_id: 'MDU6TGFiZWwxOTY4NTgzNzQ=',
      url: 'https://api.github.com/repos/facebook/react/labels/CLA%20Signed',
      name: 'CLA Signed',
      color: 'e7e7e7',
      default: false,
      description: null,
    },
    {
      id: 1775958285,
      node_id: 'MDU6TGFiZWwxNzc1OTU4Mjg1',
      url:
        'https://api.github.com/repos/facebook/react/labels/React%20Core%20Team',
      name: 'React Core Team',
      color: '9149d1',
      default: false,
      description: 'Opened by a member of the React Core Team',
    },
  ],
  state: 'open',
  created_at: '2020-09-24T20:00:13Z',
  number: 19902,
  user: {
    login: 'acdlite',
    id: 3624098,
    node_id: 'MDQ6VXNlcjM2MjQwOTg=',
    avatar_url: 'https://avatars0.githubusercontent.com/u/3624098?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/acdlite',
    html_url: 'https://github.com/acdlite',
    followers_url: 'https://api.github.com/users/acdlite/followers',
    following_url:
      'https://api.github.com/users/acdlite/following{/other_user}',
    gists_url: 'https://api.github.com/users/acdlite/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/acdlite/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/acdlite/subscriptions',
    organizations_url: 'https://api.github.com/users/acdlite/orgs',
    repos_url: 'https://api.github.com/users/acdlite/repos',
    events_url: 'https://api.github.com/users/acdlite/events{/privacy}',
    received_events_url: 'https://api.github.com/users/acdlite/received_events',
    type: 'User',
    site_admin: false,
  },
};
const initialState = {
  data: [],
  dataFiltered: [
    {
      ...data,
    },
  ],
  issueTyped: '',
  issueSelected: null,
};

const mockStore = configureStore([]);

describe('itemList Component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      ...initialState,
    });
  });
  it('renders the itemList', () => {
    const dispatchMock = jest.fn();
    const renderComponent = (props = {}) =>
      shallow(
        <Provider store={store}>
          <ItemList {...props} />
        </Provider>
      ).dive();
    const wrapper = renderComponent({ dispatch: dispatchMock });
    expect(wrapper).toMatchSnapshot();
  });

  it('should have data at dataFiltered', () => {
    const state = store.getState();
    expect(state.dataFiltered.length).not.toBe(0);
  });
});
