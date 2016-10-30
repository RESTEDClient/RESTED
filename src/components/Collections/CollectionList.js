import React from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import { connectDropTarget } from 'react-dnd';

import Collection from './Collection';

function CollectionList(props) {
  return (
    <span>
      {props.collections.map((collection, index) => (
        console.log(collection.requests) ||
        <Collection
          key={collection.id}
          collectionIndex={index}
          {...collection}
        />
      ))}
    </span>
  );
}

const mapStateToProps = ({ collections }) => ({
  collections: collections.collections,
});

export default connect(mapStateToProps)(CollectionList);

