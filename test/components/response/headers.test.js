import React from 'react';
import { shallow } from 'enzyme';

/* eslint-disable import/no-unresolved */
import Headers from 'components/Response/Headers';
import Collapse from 'components/Collapsable';

describe('Headers', () => {
  describe('when passed the expanded prop', () => {
    const props = {
      headers: [{
        name: 'test',
        value: '123',
      }, {
        name: 'spasibo',
        value: 'comrade',
      }],
      expanded: true,
    };

    it('should NOT render a Collapse', () => {
      const tree = shallow(<Headers {...props} />);
      expect(tree.find(Collapse)).toBeEmpty();
    });

    it('should render a heading', () => {
      const tree = shallow(<Headers {...props} />);
      expect(tree.find('h4')).toMatchSnapshot();
    });

    it('should render the headers', () => {
      const tree = shallow(<Headers {...props} />);
      expect(tree.find('Highlight')).toMatchSnapshot();
    });
  });

  describe('when not passed the expanded prop', () => {
    const props = {
      headers: [{
        name: 'test',
        value: '123',
      }, {
        name: 'spasibo',
        value: 'comrade',
      }],
      expanded: false,
    };

    it('should render a Collapse', () => {
      const tree = shallow(<Headers {...props} />);
      expect(tree.find(Collapse)).toBePresent();
    });

    it('should render a heading', () => {
      const tree = shallow(<Headers {...props} />);
      expect(tree.find('h4')).toMatchSnapshot();
    });

    it('should render the headers', () => {
      const tree = shallow(<Headers {...props} />);
      expect(tree.find('Highlight')).toMatchSnapshot();
    });
  });
});

