import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Toolbar from './components/Toolbar';
import Compose from './components/Compose';
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

sendMessage = async(message) => {
  this.postMessages(message)
  }

getMessages = () => (
  fetch(`${process.env.REACT_APP_API_URL}/hoard`,{
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
)

postMessages = async (message) => {
let response = await fetch(`${process.env.REACT_APP_API_URL}/hoard`, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subject: message.subject,
        body: message.body,
      }),
      method: 'POST',
    })

const response2 = await this.getMessages()
const { messages } = response2._embedded;
this.setState({
  messages: messages,
  composing: false, })
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

  toggleCompose = (message) => {
    this.setState({composing: !this.state.composing})
  }

  applyLabel = async(label) => {
    await this.updateMessages ({
      'messageIds': this.state.messages.filter(message => message.selected).map(message => message.id),
      "command": "addLabel",
      "label": label
    })
    const messages = this.state.messages.map(message => (
      message.selected && !message.labels.includes(label) ?
      {...message, labels: [...message.labels, label].sort()} : message
    ))
    this.setState({ messages })
  }

  removeLabel = async(label) => {
    await this.updateMessages ({
      'messageIds': this.state.messages.filter(message => message.selected).map(message => message.id),
      "command": "addLabel",
      "label": label
    })
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
    console.log(this.props.message)
    console.log(this.props.messages)
    console.log(this.state)
    console.log(this.state.messages)
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
          toggleCompose = { this.toggleCompose }
          sendMessage = { this.sendMessage }
          toggleRead = { this.toggleRead }
          applyLabel = { this.applyLabel}
        />
      </div>
    )
  }
}

export default App;
