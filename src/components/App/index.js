import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import flow from 'lodash.flow';

import Header from 'components/Header';
import LeftPanel from 'components/LeftPanel';
import Request from 'components/Request';
import Response from 'components/Response';
import Footer from 'components/Footer';
import Modal from 'components/Modal';
import updateTheme from 'utils/updateTheme';
import updateHighlightStyle from 'utils/updateHighlightStyle';
import { getTheme, getHighlightStyle, getCollectionsMinimized } from 'store/options/selectors';
import { fetchOptions } from 'store/options/actions';
import { fetchUrlVariables } from 'store/urlVariables/actions';
import { THEMES, HIGHLIGHT_STYLES } from 'constants/constants';
import './GlobalStyles';

import { Wrapper, MainContent, LeftCol, RightCol } from './StyledComponents';


/*
 * This must be a React.Component because DragDropContext
 * attaches a ref to the component, which as we know will
 * not work with a stateless functional component.
 */
class App extends React.Component {
  static propTypes = {
    fetchUrlVariables: PropTypes.func.isRequired,
    fetchOptions: PropTypes.func.isRequired,
    theme: PropTypes.oneOf(THEMES).isRequired,
    highlightStyle: PropTypes.oneOf(HIGHLIGHT_STYLES.map(style => style.style)).isRequired,
    collectionsMinimized: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    props.fetchOptions();
    props.fetchUrlVariables();

    updateTheme(props.theme);
    updateHighlightStyle(props.highlightStyle);
  }

  // Need to do this on prop change to react to sync storage option change
  componentWillReceiveProps({ theme, highlightStyle }) {
    if (this.props.theme !== theme) {
      updateTheme(theme);
    }
    if (this.props.highlightStyle !== highlightStyle) {
      updateHighlightStyle(highlightStyle);
    }
  }

  render() {
    const { collectionsMinimized } = this.props;

    return (
      <Wrapper>
        <Header />
        <MainContent>
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
        </MainContent>
        <Footer />
        <Modal />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  theme: getTheme(state),
  highlightStyle: getHighlightStyle(state),
  collectionsMinimized: getCollectionsMinimized(state),
});

export default flow(
  connect(mapStateToProps, { fetchOptions, fetchUrlVariables }),
  DragDropContext(HTML5Backend),
)(App);

