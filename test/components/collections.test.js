import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { DragDropContext } from 'react-dnd';
import TestBackend from 'react-dnd-test-backend';

/* eslint-disable import/no-unresolved */
import Collections from 'components/Collections';
import Collection from 'components/Collections/Collection';

import makeStore from '../makeStore';
import mockCollections from '../mock/collections.mock';

jest.mock('react-dom');

/**
 * Wraps a component into a DragDropContext that uses the TestBackend.
 */
function wrapInTestContext(DecoratedComponent, store = makeStore()) {
  return DragDropContext(TestBackend)(
    /* eslint-disable react/prefer-stateless-function */
    class TestContextContainer extends React.Component {
      render() {
        return (
          <Provider store={store}>
            <DecoratedComponent {...this.props} />
          </Provider>
        );
      }
    }
    /* eslint-enable react/prefer-stateless-function */
  );
}

describe('Collections component', () => {
  const store = makeStore({
    collections: mockCollections,
  });

  it('should match the previous snapshot', () => {
    const BoxedComponent = wrapInTestContext(Collections, store);
    const tree = renderer.create(
      <BoxedComponent />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a "no requests" message when given no collections', () => {
    const BoxedComponent = wrapInTestContext(Collections);
    const tree = mount(
      <BoxedComponent />
    );

    expect(tree.find('h5').prop('children')).toEqual('No collected requests. Add by pressing "plus" in the top right of the request panel.');
  });

  it('should render two collections when given a dataset with two collections', () => {
    const BoxedComponent = wrapInTestContext(Collections, store);
    const tree = mount(
      <BoxedComponent />
    );

    expect(tree.find('Collection').length).toEqual(2);
  });
});

describe('Collection component', () => {
  it('should match the previous snapshot', () => {
    const BoxedComponent = wrapInTestContext(Collection);
    const requests = mockCollections
      .getIn(['collections', 0, 'requests'])
      .toJS();

    const tree = renderer.create(
      <BoxedComponent
        collectionIndex={0}
        requests={requests}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  xit('should change the styles of dragged elements');
    /*
    const BoxedComponent = wrapInTestContext(Collection);
    const requests = mockCollections
      .getIn(['collections', 1, 'requests'])
      .toJS();

    const tree = mount(
      <BoxedComponent
        collectionIndex={1}
        requests={requests}
      />
    );

    // Obtain a reference to the backend
    const backend = tree.instance().getManager().getBackend();

    // Test that the background color is white
    expect(tree.find('Panel').props.style.opacity).toEqual(1);

    // Find the drag source ID and use it to simulate the dragging operation
    const box = TestUtils.findRenderedComponentWithType(root, Box);
    backend.simulateBeginDrag([box.getHandlerId()]);

    // Verify that the element changed its color
    const div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
    expect(div.props.style.opacity).toEqual(0.4);

    // See other backend.simulate* methods for more!
  });
  */

  xit('should have draggable requests');
});

