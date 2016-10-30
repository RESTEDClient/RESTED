import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Collection from './Collection';

import * as Actions from '../../store/collections/actions';
import collectionPropType from '../../propTypes/collection';

function CollectionList(props) {
  return (
    <span>
      {props.collections.map((collection, index) => (
        <Collection
          key={collection.id}
          collectionIndex={index}
          reorderCollection={props.reorderCollection}
          {...collection}
        />
      ))}
      {!props.collections.length && (
        <div>
          <h5>
            No collected requests.
            Add by pressing &quot;plus&quot; in the top right of the request panel.
          </h5>
        </div>
      )}
    </span>
  );
}

CollectionList.propTypes = {
  reorderCollection: PropTypes.func.isRequired,
  collections: PropTypes.arrayOf(collectionPropType).isRequired,
};

const mapStateToProps = ({ collections }) => ({
  collections: collections.collections,
});

export default connect(mapStateToProps, Actions)(CollectionList);

