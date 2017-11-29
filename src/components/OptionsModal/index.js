import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import TemplateOptionsPane from './TemplateOptionsPane';
import GeneralOptionsPane from './GeneralOptionsPane';
import SyncPane from './SyncPane';
import ImportPane from './ImportPane';
import ExportPane from './ExportPane';

const getDefaultTab = (props) => {
  const params = new URLSearchParams(location.search);
  const action = params.get('action');
  if (action === '') {
  }
};

export default class OptionsModalBody extends React.Component {
  state = {
    // TODO move to redux
    activeTab: getDefaultTab(this.props),
  };

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  render() {
    return (
      <Tabs
        activeKey={this.state.activeTab}
        onSelect={this.setActiveTab}
        id="OptionTabs"
      >
        <Tab eventKey={0} title="URL Templates">
          <TemplateOptionsPane />
        </Tab>
        <Tab eventKey={1} title="Options">
          <GeneralOptionsPane />
        </Tab>
        <Tab eventKey={2} title="Sync">
          <SyncPane />
        </Tab>
        <Tab eventKey={3} title="Import data">
          <ImportPane />
        </Tab>
        <Tab eventKey={4} title="Export data">
          <ExportPane />
        </Tab>
      </Tabs>
    );
  }
}

