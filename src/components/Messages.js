import React from 'react';
import Message from '../components/Message'

const Messages = ({
  messages,
  toggleSelect,
  toggleStar,
}) => {
  console.log(messages)
  return (
    <div>
      {
        messages.map((message, i) => <Message
          key = { messages[i].id }
          message = { message }
          toggleSelect = { toggleSelect }
          toggleStar = { toggleStar }
        />)
      }
    </div>
  )
}


export default Messages;
