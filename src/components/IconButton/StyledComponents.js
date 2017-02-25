/* eslint-disable no-confusing-arrow */
import styled, { css } from 'styled-components';

const ease = 'cubic-bezier(0.23, 1, 0.32, 1)';
const iconSize = 16;

export const StyledButton = styled.button`
  border: 10px none;
  boxSizing: border-box;
  overflow: visible;
  width: ${iconSize * 2}px;
  height: ${iconSize * 1.5}px;
  fontSize: 0;
  backgroundColor: transparent;

  display: inline-block;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  textDecoration: none;
  margin: 0;
  outline: none;
  position: relative;
  zIndex: 1;

  .fa {
    fontSize: ${iconSize}px;
  }
`;

const containerWhenShown = css`
  top: ${iconSize * 1.5}px;
  opacity: 0.9;
  transform: translate(0px, 5px);
  transition: 0ms top ${ease} 0ms, 450ms transform ${ease} 0ms, 450ms opacity ${ease} 0ms;
`;

const rippleWhenShown = css`
  backgroundColor: rgb(97, 97, 97);
  transition: 45ms width ${ease} 0ms, 450ms height ${ease} 0ms, 450ms backgroundColor ${ease} 0ms;
`;

export const TooltipContainer = styled.div`
  position: absolute;
  fontSize: 12px;
  lineHeight: 25px;
  padding: 0 10px;
  zIndex: 200;
  color: white;
  overflow: hidden;
  top: -10000px;
  borderRadius: 2px;
  userSelect: none;
  opacity: 0;
  left: ${props => ((props.offsetWidth - (iconSize * 2)) / 2) * -1}px;

  transition: 0ms top ${ease} 450ms, 450ms transform ${ease} 0ms, 450ms opacity ${ease} 0ms;

  ${props => props.show && containerWhenShown}
`;

export const Ripple = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
  borderRadius: 50%;
  color: black;
  backgroundColor: transparent;
  transition: 0ms width ${ease} 450ms, 0ms height ${ease} 450ms, 450ms backgroundColor ${ease} 0ms;

  ${props => props.show && rippleWhenShown}
`;

export const TooltipLabel = styled.span`
  position: relative;
  whiteSpace: nowrap;
`;

