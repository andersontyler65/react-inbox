import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Toolbar from './components/Toolbar';
import Message from './components/Message';
import Messages from './components/Messages';
import Index from './stories/index'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Toolbar />
        <Message />
        <Messages />
      </div>
    )
  }
}

export default App;
