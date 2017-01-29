import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

import requestShape from 'propTypes/request';
import { getHistory } from 'store/history/selectors';
import * as Actions from 'store/history/actions';

function ListGroupHeader({ index, request, removeFromHistory }) {
  return (
    <h4 className="list-group-item-heading">
      {request.get('method')}
      <div
        className="pull-right"
        id="removeRequest"
      >
        <button
          onClick={e => {
            e.stopPropagation();
            removeFromHistory(index);
          }}
        >
          Remove from history
        </button>
      </div>
    </h4>
  );
}

ListGroupHeader.propTypes = {
  index: PropTypes.number.isRequired,
  request: requestShape.isRequired,
  removeFromHistory: PropTypes.func.isRequired,
};

class HistoryList extends React.Component {
  componentDidMount() {
    this.props.fetchHistory();
  }

  render() {
    const { history, removeFromHistory, selectRequest } = this.props;
    return (
      <ul>
        {history.map((request, index) => (
          <li key={index}>
            <ListGroup componentClass="ul">
              <li
                className="list-group-item"
                onClick={() => selectRequest(request)}
              >
                <ListGroupHeader
                  request={request}
                  index={index}
                  removeFromHistory={removeFromHistory}
                />
                {request.get('url')}
              </li>
            </ListGroup>
          </li>
        ))}
      </ul>
    );
    /*
      <div data-ng-show="!history || history.length === 0">
        <h5>
            You have no recorded history. Send some requests and start making your legacy!
        </h5>
      </div>
    */
  }
}

HistoryList.propTypes = {
  selectRequest: PropTypes.func.isRequired,
  fetchHistory: PropTypes.func.isRequired,
  removeFromHistory: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  history: getHistory(state),
});

export default connect(mapStateToProps, Actions)(HistoryList);

