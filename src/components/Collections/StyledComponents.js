/* eslint-disable no-confusing-arrow */
import styled, { css } from 'styled-components';

const hoverStyle = css`
  background-color: gray;
  color: gray;

  button:first-child {
    border-bottom-width: 0;
  }

  > div {
    border-left-width: 0;
  }
`;

export const StyledCollection = styled.div`
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;

  ${props => props.isDragging && hoverStyle}

  .panel-default {
    background-color: red;
  }

  .panel-heading li {
    width: 48%;
    text-align: center;
    cursor: pointer;
    padding-bottom: 5px;
  }

  .panel-heading li.active {
    border-bottom: 3px solid #c8c4c4;
    font-weight: bold;
  }
`;

export const StyledCollectionHeader = styled.span`
  h3, form {
    display: inline;
  }
  input {
    width: 130px;
  }
`;

export const StyledRequest = styled.div`
  .list-group-item {
    display: flex;
    padding: 0;

    ${props => props.isDragging && hoverStyle}
  }
`;

const asideWidth = 36;

export const RequestButtons = styled.div`
  max-width: ${asideWidth}px;
  flex: 1;

  button {
    height: ${props => props.compact ? 100 : 50}%;
  }

  button:first-child {
    border-bottom: 1px solid #ddd;
  }
`;

export const MainContentDiv = styled.div`
  padding: 10px;
  word-break: break-all;
  border-left: 1px solid #ddd;
  width: calc(100% - ${asideWidth}px);

  input {
    width: calc(100% - 36px);
  }

  ${props => props.compact && css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

export const MainContentButton = styled.button`
  border: 10px none;
  boxSizing: border-box;
  backgroundColor: inherit;
  textAlign: left;
  padding: 10px;
  word-break: break-all;
  border-left: 1px solid #ddd;
  width: calc(100% - ${asideWidth}px);

  input {
    width: calc(100% - 36px);
  }

  ${props => props.compact && css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

