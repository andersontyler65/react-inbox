import React from 'react';
import Messages from '../components/Messages';

class Message extends React.Component {
  state = {}
  constructor(props) {
    super(props)
    this.state = {
    message: [props]
  };
}
    send = () => {
      this.setState((props) => ({
        state: this.state.message
      }))
    }

  render(state) {
    const messageSubject = {
        subject: this.state.message[0].message.subject
      }

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
