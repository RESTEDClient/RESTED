import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import Highlight from 'react-highlight';
import { Col, Table, FormGroup, FormControl, ControlLabel, Checkbox } from 'react-bootstrap';

import * as Actions from 'store/options/actions';
import { THEMES, HIGHLIGHT_STYLES, DEFAULT_HISTORY_SIZE } from 'constants/constants';

import { StyledGeneralOptions } from './StyledComponents';

function GeneralOptionsPane({ options, updateOption }) {
  return (
    <StyledGeneralOptions>
      <br />
      <Col xs={12}>
        <Table>
          <tbody>
            <tr>
              <td>
                <FormGroup>
                  <ControlLabel>
                    Theme
                  </ControlLabel>
                  <FormControl
                    componentClass="select"
                    value={options.get('theme', THEMES[0])}
                    onChange={e => {
                      updateOption('theme', e.target.value);
                    }}
                  >
                    {THEMES.map(theme => (
                      <option key={theme} value={theme}>
                        {theme}
                      </option>
                    ))}
                  </FormControl>
                </FormGroup>
              </td>
            </tr>

            <tr>
              <td>
                <FormGroup>
                  <ControlLabel>
                    Highlight Style
                  </ControlLabel>
                  <FormControl
                    componentClass="select"
                    value={options.get('highlightStyle', HIGHLIGHT_STYLES[0].style)}
                    onChange={e => {
                      updateOption('highlightStyle', e.target.value);
                    }}
                  >
                    {HIGHLIGHT_STYLES.map(option => (
                      <option key={option.style} value={option.style}>
                        {option.title}
                      </option>
                    ))}
                  </FormControl>
                </FormGroup>
              </td>
            </tr>

            <tr>
              <td>
                <FormGroup>
                  <Highlight className="json">
                    {`
              {
                example: "json",
                soThatYouCan: 7357,
                your: "HIGHLIGHT_STYLE"
              }
                    `}
                  </Highlight>
                </FormGroup>
              </td>
            </tr>

            <tr>
              <td>
                <FormGroup>
                  <ControlLabel>
                    Max history size
                  </ControlLabel>
                  <FormControl
                    type="number"
                    value={options.get('historySize', DEFAULT_HISTORY_SIZE)}
                    onChange={e => {
                      updateOption('historySize', e.target.value);
                    }}
                  />
                </FormGroup>
              </td>
            </tr>

            <tr>
              <td>
                <Checkbox
                  checked={options.get('disableHighlighting', false)}
                  onChange={e => {
                    updateOption('disableHighlighting', e.target.checked);
                  }}
                >
                  Disable highlight styles
                  <p>
                    If you struggle with performance on large responses,
                    disabling hightlight styles may help
                  </p>
                </Checkbox>
                <Checkbox
                  checked={options.get('wrapResponse', false)}
                  onChange={e => {
                    updateOption('wrapResponse', e.target.checked);
                  }}
                >
                  Wrap response
                  <p>
                    Wrap the lines of the response automatically when it
                    overflows the box. Enabling this will ensure you don&apos;t
                    need to scroll left/right
                  </p>
                </Checkbox>
                <Checkbox
                  checked={options.get('defaultCompact', false)}
                  onChange={e => {
                    updateOption('defaultCompact', e.target.checked);
                  }}
                >
                  Compact mode
                  <p>
                    Sets the default view on load for requests in collections to
                    compact. Useful if you have large collections, especially if
                    you use named requests
                  </p>
                </Checkbox>
                <Checkbox
                  checked={options.get('headerDescriptionEnabled', true)}
                  onChange={e => {
                    updateOption('headerDescriptionEnabled', e.target.checked);
                  }}
                >
                  Show header descriptions
                  <p>
                    Displays a short description of each header below each
                    search suggestion
                  </p>
                </Checkbox>
                <Checkbox
                  checked={options.get('ignoreCache', false)}
                  onChange={e => {
                    updateOption('ignoreCache', e.target.checked);
                  }}
                >
                  Ignore cache
                  <p>
                    Force all requests to ignore the browser cache
                  </p>
                </Checkbox>
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </StyledGeneralOptions>
  );
}

GeneralOptionsPane.propTypes = {
  updateOption: PropTypes.func.isRequired,
  options: ImmutablePropTypes.map,
};

const mapStateToProps = state => ({
  options: state.options.get('options'),
});

export default connect(mapStateToProps, Actions)(GeneralOptionsPane);

