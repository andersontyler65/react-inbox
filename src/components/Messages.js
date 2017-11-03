import React from 'react';
import Message from '../components/Message'


const Messages = ({messages}) => {
  return (
          <div>
            { messages.map((message, i) => <Message key= { messages[i].id } message = {message}/>)}
          </div>
   )
 }




export default Messages;
