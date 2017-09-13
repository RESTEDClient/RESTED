import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Autosuggest from 'react-autosuggest';
import fuzzysort from 'fuzzysort';

import headers from 'constants/commonHeaders';
import { isHeaderDescriptionEnabled } from 'store/options/selectors';
import { SuggestWrapper, Suggestion } from './StyledComponents';

// Make search indexes ahead of time to go fast!
const preparedHeaders = headers.map(header => fuzzysort.prepare(header.name));
const preparedHeadersWithDescriptions = headers.map(header => ({
  ...fuzzysort.prepare(header.name),
  ...header,
}));
const maxEntries = 7;

const compare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

// Calculate suggestions for any given input value.
const getSuggestions = (value, descriptionEnabled) => {
  const inputValue = value.trim();
  const inputLength = inputValue.length;
  const searchTarget = descriptionEnabled
    ? preparedHeadersWithDescriptions
    : preparedHeaders;

  if (inputLength === 0) return [];

  const matches = fuzzysort
    .go(inputValue, searchTarget)
    .sort((a, b) => compare(a.score, b.score));

  return matches.slice(0, maxEntries);
};

// Teach Autosuggest how to calculate the input value for
// every given suggestion.
// eslint-disable-next-line no-underscore-dangle
const getSuggestionValue = suggestion => suggestion._target;

// Ensure the user does not send a request when selecting using enter
function preventDefaultOnEnter(event, { method }) {
  if (method === 'enter') {
    event.preventDefault();
  }
}

// This unsafe is fine, as it is from a trusted source
/* eslint-disable react/no-danger */
const renderSuggestion = suggestion => (
  <Suggestion>
    <p dangerouslySetInnerHTML={{ __html: suggestion.highlighted }} />
    {suggestion.description &&
      <small>
        {suggestion.description}
      </small>}
  </Suggestion>
);
/* eslint-enable react/no-danger */

const renderInputComponent = ({ className, ...rest }) => (
  <input className={classNames(className, 'form-control')} {...rest} />
);

renderInputComponent.propTypes = {
  className: PropTypes.string,
};

export class HeaderNameAutosuggest extends React.PureComponent {
  static propTypes = {
    input: PropTypes.shape({}).isRequired,
    placeholder: PropTypes.string.isRequired,
    headerDescriptionEnabled: PropTypes.bool.isRequired,
  };

  state = {
    suggestions: [],
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.headerDescriptionEnabled),
    });
  };

  // When the suggest is closed or emptied
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { input, placeholder } = this.props;

    const inputProps = {
      ...input,
      placeholder,
      onChange: (_, { newValue }) => input.onChange(newValue),
    };

    return (
      <SuggestWrapper>
        <Autosuggest
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={preventDefaultOnEnter}
          getSuggestionValue={getSuggestionValue}
          renderInputComponent={renderInputComponent}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </SuggestWrapper>
    );
  }
}

const mapStateToProps = state => ({
  headerDescriptionEnabled: isHeaderDescriptionEnabled(state),
});

export default connect(mapStateToProps)(HeaderNameAutosuggest);
