import React from 'react';
import Messages from '../components/Messages';

class Message extends React.Component {
  constructor(props) {
    super(props)

}


  send = () => {
      this.setState((props) => ({
        state: this.state.message
      }))
    }

  render() {
    // console.log(this.props)
    const messageSubject = {
        subject: this.props.message.subject,
      }

      const readClass = messageSubject.read ? 'read' : 'unread'

      return (
      <div className="row message read">
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={this.props.message.selected}
              onClick={()=>this.props.toggleSelect(this.props.message)}/>
          </div>
          <div className="star-container col-xs-2">
            <i className={this.props.message.starred?'star fa fa-star':'star fa fa-star-o'} onClick={()=>this.props.toggleStar(this.props.message)}></i>
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
