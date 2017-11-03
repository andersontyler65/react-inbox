import React from 'react';
import Message from '../components/Message'

class Messages extends React.Component {

// const Messages = ({
//   messages,
//   toggleSelect,
//   toggleStar,
// }) => {
  constructor(props) {
    super(props)
    // console.log(props);
  };
  render() {
    // console.log(this.props)
    return (

      <div>
        {
          this.props.messages.map((message, i) => <Message
            key = { message.id }
            message = { message }
            toggleSelect={this.props.toggleSelect}
            toggleProperty={this.props.toggleProperty}
            toggleStar={this.props.toggleStar}
          />)
        }
      </div>
    )
    }
}


export default Messages;
