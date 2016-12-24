import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';

import * as Actions from 'store/collections/actions';
import CollectionList from './CollectionList';

function Titlebar({ addCollection }) {
  return (
    <span className="clearfix pull-right">
      <button onClick={addCollection}>
        Add new collection
      </button>
    </span>
  );
}

Titlebar.propTypes = {
  addCollection: PropTypes.func.isRequired,
};

function Collections({ addCollection }) {
  return (
    <Panel header={<Titlebar addCollection={addCollection} />}>
      <CollectionList />
    </Panel>
  );
}

Collections.propTypes = {
  addCollection: PropTypes.func.isRequired,
};

export default connect(null, Actions)(Collections);

