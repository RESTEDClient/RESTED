import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Collection from './Collection';

import collectionPropType from '../../propTypes/collection';

function CollectionList(props) {
  return (
    <span>
      {props.collections.map((collection, index) => (
        <Collection
          key={collection.id}
          collectionIndex={index}
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
  collections: PropTypes.arrayOf(collectionPropType).isRequired,
};

const mapStateToProps = ({ collections }) => ({
  collections: collections.get('collections').toJS(),
});

export default connect(mapStateToProps)(CollectionList);

