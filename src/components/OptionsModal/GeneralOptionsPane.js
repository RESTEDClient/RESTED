import React from 'react';
import { connect } from 'react-redux';
import Highlight from 'react-highlight';
import { Clearfix, Col, Table, FormGroup, FormControl, ControlLabel, Checkbox } from 'react-bootstrap';

function GeneralOptionsPane() {
  return (
    <Clearfix>
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
                    data-ng-model="$root.options.theme"
                    data-ng-change="$root.setOption('theme', $root.options.theme)"
                    data-ng-options="theme for theme in $parent.themes"
                  />
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
                    data-ng-model="$root.options.highlightStyle"
                    data-ng-change="$root.setOption('highlightStyle', $root.options.highlightStyle)"
                    data-ng-options="style.style as style.title for style in $parent.styles"
                  />
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
                    data-ng-model="$root.options.historySize"
                    data-ng-change="$root.setOption('historySize', $root.options.historySize)"
                  />
                </FormGroup>
              </td>
            </tr>
            <tr>
              <td>
                <Checkbox>
                  Disable highlight styles
                  <p>
                    If you struggle with performance on large responses,
                    disabling hightlight styles may help
                  </p>
                </Checkbox>
                <Checkbox>
                  Wrap response
                  <p>
                    Wrap the lines of the response automatically when it
                    overflows the box. Enabling this will ensure you don&apos;t
                    need to scroll left/right
                  </p>
                </Checkbox>
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Clearfix>
  );
}

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(GeneralOptionsPane);

