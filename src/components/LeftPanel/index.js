import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavItem } from 'react-bootstrap';

import Collections from 'components/Collections';
import History from 'components/History';
import { updateOption } from 'store/options/actions';
import { getActiveTab } from 'store/options/selectors';

import { Panel, StyledTitlebar } from './StyledComponents';

function Titlebar(props) {
  return (
    <StyledTitlebar {...props} bsStyle="pills">
      <NavItem eventKey="collections">Collections</NavItem>
      <NavItem eventKey="history">History</NavItem>
    </StyledTitlebar>
  );
}

function LeftPanel({ activeTab, setActiveTab }) {
  return (
    <Panel header={<Titlebar activeKey={activeTab} onSelect={setActiveTab} />}>
      {activeTab === 'collections' && <Collections />}
      {activeTab === 'history' && <History />}
    </Panel>
  );
}

LeftPanel.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  activeTab: getActiveTab(state),
});

export default connect(mapStateToProps, {
  setActiveTab: value => updateOption('activeTab', value),
})(LeftPanel);

