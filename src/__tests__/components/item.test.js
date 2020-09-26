import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Item from '../../pages/homePage/components/item/item';
import { findByTestAttr, checkProps } from '../../../utils';

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
const setUp = (props = {}) => {
  const component = shallow(<Item {...props} />);
  return component;
};

describe('item Component', () => {
  describe('Have props', () => {
    let component;
    beforeEach(() => {
      const props = { ...data };
      component = setUp(props);
    });
    it('Should render without errors', () => {
      const wrapper = findByTestAttr(component, 'test-container');
      expect(wrapper.length).toBe(1);
    });
  });

  describe('Checking PropTypes', () => {
    let component;
    beforeEach(() => {
      const props = { ...data };
      component = setUp(props);
    });
    it('Should not throw a warning', () => {
      const expectedProps = { ...data };
      const propsErr = checkProps(component, Item.propTypes, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Item info', () => {
    let component;
    beforeEach(() => {
      const props = { ...data };
      component = setUp(props);
    });

    it('should render information about the issue', () => {
      const issueState = findByTestAttr(component, 'issue-state');
      expect(issueState.length).toBe(1);
    });

    it('should render information about the author issue', () => {
      const authorNickName = findByTestAttr(component, 'author-nickname');
      const authorImage = findByTestAttr(component, 'author-image');
      const authorGithub = findByTestAttr(component, 'author-github');
      expect(authorNickName.length).toBe(1);
      expect(authorImage.length).toBe(1);
      expect(authorGithub.length).toBe(1);
    });
  });
});
