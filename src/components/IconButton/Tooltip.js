import React, { Component, PropTypes } from 'react';
import { TooltipContainer, TooltipLabel, Ripple } from './StyledComponents';

export default class Tooltip extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    show: PropTypes.bool,
  };

  state = {
    offsetWidth: null,
  };

  componentDidMount() {
    this.setRippleSize();
    this.setTooltipPosition();
  }

  componentWillReceiveProps() {
    this.setTooltipPosition();
  }

  componentDidUpdate() {
    this.setRippleSize();
  }

  setRippleSize() {
    const ripple = this.rippleRef;
    const tooltip = this.tooltipRef;
    const tooltipWidth = parseInt(tooltip.offsetWidth, 10) / 2;
    const tooltipHeight = parseInt(tooltip.offsetHeight, 10);

    const rippleDiameter = Math.ceil((Math.sqrt(
      (tooltipHeight ** 2) +
      (tooltipWidth ** 2)) * 2
    ));

    if (this.props.show) {
      ripple.style.height = `${rippleDiameter}px`;
      ripple.style.width = `${rippleDiameter}px`;
    } else {
      ripple.style.width = '0px';
      ripple.style.height = '0px';
    }
  }

  setTooltipPosition() {
    this.setState({ offsetWidth: this.tooltipRef.offsetWidth });
  }

  render() {
    const { label, show } = this.props;

    return (
      <TooltipContainer
        innerRef={ref => { this.tooltipRef = ref; }}
        offsetWidth={this.state.offsetWidth}
        show={show}
      >
        <Ripple
          innerRef={ref => { this.rippleRef = ref; }}
          show={show}
        />
        <TooltipLabel>
          {label}
        </TooltipLabel>
      </TooltipContainer>
    );
  }
}

