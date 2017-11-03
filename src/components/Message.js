import React from 'react';
import Messages from '../components/Messages';

class Message extends React.Component {
  state = {}
  constructor(props) {
    super(props)
    console.log(props)
    this.state = { message: props
  };
}

toggleProperty(message, property) {
  this.setState((prevState) => {
    const index = prevState.messages.indexOf(message)
    return {
      messages: [
        ...prevState.messages.slice(0, index),
        { ...message, [property]: !message[property] },
        ...prevState.messages.slice(index + 1),
      ]
    };
  })
}

toggleSelect(message) {
  this.toggleProperty(message, 'selected')
}

// toggleStar(message) {
//   this.toggleProperty(message, 'starred')
// }

markAsRead() {
  this.setState((prevState) => {
    return {
      messages: prevState.messages.map(message => (
        message.selected ? { ...message, read: true } : message
      ))
    }
  })
}

  send = () => {
      this.setState((props) => ({
        state: this.state.message
      }))
    }

  render(state) {
    console.log(this.state)
    const messageSubject = {
        subject: this.state.message.message.subject,
      }

      const readClass = messageSubject.read ? 'read' : 'unread'

      return (
      <div className="row message read">
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" />
          </div>
          <div className="col-xs-2">
            <i className="star fa fa-star-o"></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
            <p align="left">Subject:</p>{JSON.stringify(messageSubject.subject)}
      </div>
    </div>
        )
      }
  }



export default Message;
