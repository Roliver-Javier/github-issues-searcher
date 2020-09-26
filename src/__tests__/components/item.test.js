import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Item from '../../pages/homePage/components/item/item';
import { findByTestAttr, checkProps, mockData } from '../../../utils';

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<Item {...props} />);
  return component;
};

describe('item Component', () => {
  describe('Have props', () => {
    let component;
    beforeEach(() => {
      const props = { ...mockData.issueSelected };
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
      const props = { ...mockData.issueSelected };
      component = setUp(props);
    });
    it('Should not throw a warning', () => {
      const expectedProps = { ...mockData.issueSelected };
      const propsErr = checkProps(component, Item.propTypes, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Item info', () => {
    let component;
    beforeEach(() => {
      const props = { ...mockData.issueSelected };
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
