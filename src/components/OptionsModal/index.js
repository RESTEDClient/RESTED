import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import Fonticon from 'components/Fonticon';

import TemplateOptionsPane from './TemplateOptionsPane';
import GeneralOptionsPane from './GeneralOptionsPane';
import SyncPane from './SyncPane';
import ImportPane from './ImportPane';
import ExportPane from './ExportPane';

export default class OptionsModalBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
    };
  }

  render() {
    return (
      <Tabs
        activeKey={this.state.activeTab}
        onSelect={activeTab => this.setState({ activeTab })}
        id="OptionTabs"
      >
        <Tab
          eventKey={0} title={<span>
            <Fonticon icon="link" />
            <span>URL Templates</span>
          </span>}
        >
          <TemplateOptionsPane />
        </Tab>
        <Tab
          eventKey={1} title={
            <span>
              <Fonticon icon="cogs" />
              <span>Options</span>
            </span>
        }
        >
          <GeneralOptionsPane />
        </Tab>
        <Tab
          eventKey={2} title={
            <span>
              <Fonticon icon="refresh" />
              <span>Sync</span>
            </span>
        }
        >
          <SyncPane />
        </Tab>
        <Tab
          eventKey={3} title={
            <span>
              <Fonticon icon="download" />
              <span>Import data</span>
            </span>
        }
        >
          <ImportPane />
        </Tab>
        <Tab
          eventKey={4} title={
            <span>
              <Fonticon icon="upload" />
              <span>Export data</span>
            </span>
        }
        >
          <ExportPane />
        </Tab>
      </Tabs>
    );
  }
}

