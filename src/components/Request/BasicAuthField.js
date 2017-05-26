import React, { PropTypes } from 'react';
import { Col, FormGroup, FormControl, Checkbox } from 'react-bootstrap';

import Collapsable from 'components/Collapsable';

export class BasicAuthField extends React.Component {
  static propTypes = {
    basicAuth: PropTypes.shape({
      username: PropTypes.shape({
        input: PropTypes.shape({}).isRequired,
      }).isRequired,
      password: PropTypes.shape({
        input: PropTypes.shape({}).isRequired,
      }).isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.toggleShowPassword = this.toggleShowPassword.bind(this);
  }

  state = {
    showPassword: false,
  };

  toggleShowPassword(e) {
    this.setState({
      showPassword: e.target.checked,
    });
  }

  render() {
    const { basicAuth } = this.props;

    return (
      <Collapsable
        title="Basic auth"
        id="basicAuth"
      >
        <FormGroup controlId="method">
          <Col xs={5}>
            <FormControl
              type="text"
              placeholder="Username"
              {...basicAuth.username.input}
            />
          </Col>
          <Col xs={5}>
            <FormControl
              type={this.state.showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...basicAuth.password.input}
            />
          </Col>
          <Col xs={2}>
            <Checkbox
              checked={this.state.showPassword}
              onChange={this.toggleShowPassword}
            >
              Show password?
            </Checkbox>
          </Col>
        </FormGroup>
      </Collapsable>
    );
  }
}

export default BasicAuthField;

