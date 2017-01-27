import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import requestShape from 'propTypes/request';
import { getHistory } from 'store/history/selectors';
import * as Actions from 'store/history/actions';

function ListGroupHeader({ request, removeFromHistory }) {
  return (
    <h4>
      {request.get('method')}
      <div
        className="pull-right"
        id="removeRequest"
      >
        <button
          data-config="removeRequestConfig"
          onClick={removeFromHistory}
          data-click-event="removeFromHistory($index)"
        >
          Remove from history
        </button>
      </div>
    </h4>
  );
}

ListGroupHeader.propTypes = {
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
            <ListGroup>
              <ListGroupItem
                header={
                  <ListGroupHeader
                    request={request}
                    index={index}
                    removeFromHistory={removeFromHistory}
                  />
                }
                onClick={() => selectRequest(request)}
              >

                {request.get('url')}
              </ListGroupItem>
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

