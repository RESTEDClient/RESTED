import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';

function SubmitButton(props) {
  if (props.editMode) {
    return (
      <Button type="submit" bsStyle="success" block>
        {(props.compact ? 'Update' : 'Update request')}
      </Button>
    );
  }

  return (
    <Button type="submit" bsStyle="primary" block>
      {(props.compact ? 'Send' : 'Send request')}
    </Button>
  );
}

SubmitButton.propTypes = {
  editMode: PropTypes.bool.isRequired,
  compact: PropTypes.bool,
  /* eslint-enable react/forbid-prop-types */
};

export default SubmitButton;

