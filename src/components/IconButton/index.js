import React, { PropTypes } from 'react';
import Fonticon from 'components/Fonticon';

import Tooltip from './Tooltip';
import { StyledButton } from './StyledComponents';

export default class IconButton extends React.Component {
  static propTypes = {
    tooltip: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  state = {};

  showTooltip() {
    if (this.props.tooltip) {
      this.setState({ tooltipShown: true });
    }
  }

  hideTooltip() {
    if (this.props.tooltip) {
      this.setState({ tooltipShown: false });
    }
  }

  handleMouseEnter() {
    this.showTooltip();
    this.setState({ hovered: true });
  }

  handleMouseLeave() {
    this.hideTooltip();
    this.setState({ hovered: false });
  }

  render() {
    const { tooltip, icon, ...rest } = this.props;

    const tooltipElement = tooltip ? (
      <Tooltip
        label={tooltip}
        show={this.state.tooltipShown}
      />
    ) : null;

    return (
      <StyledButton
        onMouseLeave={this.handleMouseLeave}
        onMouseEnter={this.handleMouseEnter}
        {...rest}
      >
        {tooltipElement}
        <Fonticon icon={icon} />
      </StyledButton>
    );
  }
}

