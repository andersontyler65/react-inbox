import React from 'react';
import Message from '../components/Message'
import Compose from '../components/Compose'

class Messages extends React.Component {
  constructor(props) {
    super(props)
  };
  render() {
    return (
      <div>
        {
          this.props.messages.map((message, i) =>
          <Message
            key = { message.id }
            message = { message }
            sendMessage = { this.props.sendMessage }
            toggleSelect={this.props.toggleSelect}
            toggleProperty={this.props.toggleProperty}
            toggleStar={this.props.toggleStar}
            toggleRead = { this.props.toggleRead }
            toggleCompose = {this.props.toggleCompose }
            updateMessages = { this.props.updateMessages }
            markAsRead = { this.props.markAsRead }
            markAsUnread = { this.props.markAsUnread }
            applyLabel = {this.props.applyLabel}
            removeLabel = { this.props.removeLabel}
          />)
        }
      </div>
    )
  }
}


export default Messages;
