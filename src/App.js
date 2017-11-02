import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Toolbar from './components/Toolbar'
import Messages from './components/Messages'

class App extends Component {
 constructor(props) {
   super(props)
   this.state = { messages: props.messages}
 }

  render() {
    return (
      <div className="App">
        <Toolbar />
        <Messages messages={ this.state.messages } />
      </div>
    )
  }
}

export default App;
