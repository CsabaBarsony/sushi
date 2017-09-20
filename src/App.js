import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function makeRequest (method, url, done) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onload = function () {
    done(null, xhr.response);
  };
  xhr.onerror = function () {
    done(xhr.response);
  };
  xhr.send();
}

class App extends Component {
  componentDidMount() {
    makeRequest('GET', 'http://localhost:3000/getSuggestions/c', function (err, datums) {
      if (err) { throw err; }
      console.log(datums);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
