import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

/* eslint-disable import/no-unresolved */
import SubmitButton from 'components/Request/SubmitButton';

describe('SubmitButton', () => {
  describe('EditMode: false', () => {
    let initialProps;

    beforeEach(() => {
      initialProps = {
        editMode: false,
      };
    });

    it('should match the previous snapshot with editMode false', () => {
      const tree = renderer
        .create(<SubmitButton {...initialProps} />);

      expect(tree).toMatchSnapshot();
    });

    it('should render a submit button with a New Request Label', () => {
      const tree = mount(
        <SubmitButton {...initialProps} />,
      );

      expect(tree.find('button').length).toBe(1);
      expect(tree.find('button').text()).toBe('Send request');
    });
  });

  describe('EditMode: true', () => {
    let initialProps;

    beforeEach(() => {
      initialProps = {
        editMode: true,
      };
    });

    it('should match the previous snapshot with editMode true', () => {
      const tree = renderer
        .create(<SubmitButton {...initialProps} />);

      expect(tree).toMatchSnapshot();
    });

    it('should render a submit button with Update label', () => {
      const tree = mount(
        <SubmitButton {...initialProps} />,
      );
      expect(tree.find('button').length).toBe(1);
      expect(tree.find('button').text()).toBe('Update request');
    });
  });

  describe('Compact: true', () => {
    let initialProps;

    beforeEach(() => {
      initialProps = {
        editMode: false,
        compact: true,
      };
    });

    it('should match the previous snapshot with compact true', () => {
      const tree = renderer
        .create(<SubmitButton {...initialProps} />);

      expect(tree).toMatchSnapshot();
    });

    it('should render a submit button with a Compact Request Label', () => {
      const tree = mount(
        <SubmitButton {...initialProps} />,
      );

      expect(tree.find('button').length).toBe(1);
      expect(tree.find('button').text()).toBe('Send');
    });
  });
});

