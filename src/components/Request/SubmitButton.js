import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';

function SubmitButton(props) {
  if (props.editMode) {
    return (
      <Button type="submit" bsStyle="success">
        Update request
      </Button>
    );
  }

  return (
    <Button type="submit" bsStyle="primary">
      Send request
    </Button>
  );
}

SubmitButton.propTypes = {
  editMode: PropTypes.bool.isRequired,
  /* eslint-enable react/forbid-prop-types */
};

export default SubmitButton;

