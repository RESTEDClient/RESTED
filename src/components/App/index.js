import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import flow from 'lodash.flow';

import Header from 'components/Header';
import LeftPanel from 'components/LeftPanel';
import Request from 'components/Request';
import Response from 'components/Response';
import Modal from 'components/Modal';
import updateTheme from 'utils/updateTheme';
import { getTheme, getCollectionsMinimized } from 'store/options/selectors';
import { fetchOptions } from 'store/options/actions';
import { fetchUrlVariables } from 'store/urlVariables/actions';
import { THEMES } from 'constants/constants';
import './GlobalStyles';

import { LeftCol, RightCol } from './StyledComponents';

/*
 * This must be a React.Component because DragDropContext
 * attaches a ref to the component, which as we know will
 * not work with a stateless functional component.
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    props.fetchOptions();
    props.fetchUrlVariables();

    updateTheme(props.theme);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.theme !== this.props.theme) {
      updateTheme(newProps.theme);
    }
  }

  render() {
    const { collectionsMinimized } = this.props;

    return (
      <div>
        <Header />
        <Row>
          <LeftCol
            xsHidden
            sm={collectionsMinimized ? null : 4}
            collapsed={collectionsMinimized}
          >
            <aside>
              <LeftPanel />
            </aside>
          </LeftCol>
          <RightCol
            xs={12}
            sm={collectionsMinimized ? 12 : 8}
          >
            <main>
              <Request />
              <Response />
            </main>
          </RightCol>
        </Row>
        <Modal />
      </div>
    );
  }
}

App.propTypes = {
  fetchUrlVariables: PropTypes.func.isRequired,
  fetchOptions: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(THEMES).isRequired,
  collectionsMinimized: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  theme: getTheme(state),
  collectionsMinimized: getCollectionsMinimized(state),
});

export default flow(
  connect(mapStateToProps, { fetchOptions, fetchUrlVariables }),
  DragDropContext(HTML5Backend),
)(App);

