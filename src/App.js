import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Toolbar from './components/Toolbar';
import Messages from './components/Messages';
import Message from './components/Message';
import Compose from './components/Compose';

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

async request(path, method = 'GET', body = null) {
    if (body) body = JSON.stringify(body)
    return await fetch(`${process.env.REACT_APP_API_URL}${path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: body
    })
  }

async updateMessages(payload) {
   await this.request('/api/messages', 'PATCH', payload)
  }

async sendMessage(message) {
  const response = await this.request('/api/messages', 'POST', {
    subject: message.subject,
    body: message.body,
  })
  const newMessage = await response.json()

  const messages = [...this.state.messsages, newMessage]
  this.setState({
    messages,
    composing: false,
  })
}

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

  toggleCompose = (message) => {
    this.setState({composing: !this.state.composing})
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
    return (
      <div className="App">
        <Toolbar
          markAsRead = { this.markAsRead }
          markAsUnread = { this.markAsUnread }
          applyLabel = { this.applyLabel }
          removeLabel = { this.removeLabel }
          deleteMessages = { this.deleteMessages }
          toggleCompose = {this.toggleCompose }
          toggleSelectAll = { this.toggleSelectAll }
          messages = { this.state. messages }
        />

        {this.state.composing ?
          <Compose
            sendMessage={ this.sendMessage } /> : null}

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
