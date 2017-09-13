import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Autosuggest from 'react-autosuggest';
import fuzzysort from 'fuzzysort';

import headers from 'constants/commonHeaders';
import { SuggestWrapper } from './StyledComponents';

// Make search indexes ahead of time to go fast!
const preparedHeaders = headers.map(header => fuzzysort.prepare(header));
const maxEntries = 7;

const compare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

// Calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim();
  const inputLength = inputValue.length;

  if (inputLength === 0) return [];

  const matches = fuzzysort
    .go(inputValue, preparedHeaders)
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

const renderSuggestion = suggestion => (
  // This unsafe is fine, as it is from a trusted source
  // eslint-disable-next-line react/no-danger
  <div dangerouslySetInnerHTML={{ __html: suggestion.highlighted }} />
);

const renderInputComponent = ({ className, ...rest }) => (
  <input className={classNames(className, 'form-control')} {...rest} />
);

renderInputComponent.propTypes = {
  className: PropTypes.string,
};

export default class HeaderNameAutosuggest extends React.PureComponent {
  static propTypes = {
    input: PropTypes.shape({}).isRequired,
    placeholder: PropTypes.string.isRequired,
  };

  state = {
    suggestions: [],
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
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

