import React from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import { connectDropTarget } from 'react-dnd';

import Collection from './Collection';

function CollectionList(props) {
  return (
    <span>
      {props.collections.map((collection, index) => (
        <Panel
          key={collection.id}
          header={<h1>TODO</h1>}
        >
          <Collection
            collectionIndex={index}
            {...collection}
          />
        </Panel>
      ))}
    </span>
  );
}

const mapStateToProps = ({ collections }) => ({
  collections: collections.collections,
});

export default connect(mapStateToProps)(CollectionList);

