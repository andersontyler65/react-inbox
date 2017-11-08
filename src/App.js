import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Toolbar from './components/Toolbar';
import Messages from './components/Messages';
import Message from './components/Message';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    };
  }

async componentDidMount() {
  const response = await this.getMessages();

  const { messages } = response._embedded;

  this.setState({ messages })
}

  getMessages = () => (
  fetch('http://localhost:8082/api/messages', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
)

  toggleProperty = (message, property) => {
      const index = this.state.messages.indexOf(message)
      this.setState({
        messages: [
          ...this.state.messages.slice(0, index),
          { ...message, [property]: !message[property] },
          ...this.state.messages.slice(index + 1),
        ]
    })
  }

  toggleSelect = (message) => {
    this.toggleProperty(message, 'selected')
  }

  toggleStar = (message) => {
    this.toggleProperty(message, 'starred')
  }
  toggleRead = (message) => {
    this.toggleProperty(message, 'read')
  }

  applyLabel = (label) => {
    const messages = this.state.messages.map(message => (
      message.selected && !message.labels.includes(label) ?
      {...message, labels: [...message.labels, label].sort()} : message
    ))
    this.setState({ messages })
  }

  removeLabel = (label) => {
    const messages = this.state.messages.map(message => {
      const index = message.labels.indexOf(label)
      if(message.selected && index > -1){
        return {
          ...message,
          labels: [
            ...message.labels.slice(0, index),
            ...message.labels.slice(index + 1)
          ]
        }
      }
      return message
    })
    this.setState({ messages })
  }

  deleteMessages = () => {
    const messages = this.state.messages.filter(message => !message.selected)
    this.setState({ messages })
  }

  toggleSelectAll = () => {
    const selectedMessages = this.state.messages.filter(message => message.selected)
    const selected = selectedMessages.length !== this.state.messages.length
    this.setState({
      messages: this.state.messages.map(message => (
        message.selected !== selected ? {...message, selected } : message
      ))
    })
  }

  markAsRead = (message) => {
    this.setState((prevState) => {
      return {
        messages: prevState.messages.map(message => (
          message.selected ? { ...message, read: true } : message
        ))
      }
    })
  }

  markAsUnread = () => {
    this.setState({
      messages: this.state.messages.map(message => (
        message.selected ? {...message, read: false } : message
      ))
    })
  }

  render() {
    console.log(this.state.messages);
    return (
      <div className="App">
        <Toolbar
          markAsRead = { this.markAsRead }
          markAsUnread = { this.markAsUnread }
          applyLabel = { this.applyLabel }
          removeLabel = { this.removeLabel }
          deleteMessages = { this.deleteMessages }
          toggleSelectAll = { this.toggleSelectAll }
          messages = { this.state. messages }
        />
        <Messages
          messages = { this.state.messages }
          toggleSelect = { this.toggleSelect }
          toggleProperty = { this.toggleProperty }
          toggleStar = { this.toggleStar }
          toggleRead = { this.toggleRead }
          applyLabel = { this.applyLabel}
        />
      </div>
    )
  }
}

export default App;
