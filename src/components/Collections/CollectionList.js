import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import collectionPropType from 'propTypes/collection';
import { getCollections, collectionsAreFetching } from 'store/collections/selectors';
import * as Actions from 'store/collections/actions';

import Collection from './Collection';

class CollectionList extends React.Component {
  componentDidMount() {
    this.props.fetchCollections();
  }

  render() {
    const { collections, isFetching } = this.props;

    return (
      <span>
        {collections.map((collection, index) => (
          <Collection
            key={collection.id}
            collectionIndex={index}
            {...collection}
          />
        ))}
        {!isFetching && !collections.length && (
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
}

CollectionList.propTypes = {
  collections: PropTypes.arrayOf(collectionPropType).isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchCollections: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  collections: getCollections(state).toJS(),
  isFetching: collectionsAreFetching(state),
});

export default connect(mapStateToProps, Actions)(CollectionList);

