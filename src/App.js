import React, { Component } from 'react'
import './App.css'
import api from './api.js'
import Autosuggest from 'react-autosuggest'

const renderSuggestion = suggestion =>
  <div>
    {suggestion.name}
  </div>

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      suggestions: [],
      loading: false,
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      text: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    if(value) {
      api.getSuggestions(value, (err, suggestions) => {
        if (err) { throw err }
        this.setState({ suggestions: suggestions })
      })
    }
    else {
      this.setState({ suggestions: [] })
    }
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  render() {
    const inputProps = {
      placeholder: 'Type a programming language',
      value: this.state.text,
      onChange: this.onChange,
    }

    return (
      <div className="App">
        <Autosuggest
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={s => s.name}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    )
  }
}

export default App
