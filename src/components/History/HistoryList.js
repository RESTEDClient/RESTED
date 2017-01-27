import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { getHistory } from 'store/history/selectors';
import * as Actions from 'store/history/actions';

function ListGroupHeader({ request, index, removeFromHistory }) {
  return (
    <h4>
      {request.get('method')}
      <div
        class="pull-right"
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

class HistoryList extends React.Component {
  componentDidMount() {
    this.props.fetchHistory();
  }

  render() {
    const { history, removeFromHistory, selectRequest } = this.props;
    return (
      <ul class="panel-body collection-body"
        data-ng-hide="history.length === 0">
        {history.map((request, index) => (
          <li>
            <ListGroup>
              <ListGroupItem
                header={
                  <ListGroupHeader
                    request={request}
                    index={index}
                    removeFromHistory={removeFromHistory}
                  />
                }
                data-ng-class="{active: request == selectedRequest}"
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

const mapStateToProps = state => ({
  history: getHistory(state),
});

export default connect(mapStateToProps, Actions)(HistoryList);

