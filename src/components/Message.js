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

classes = () => {
  let classes = `row message ${this.props.message.read ? 'read' : 'unread' } ${this.props.message.selected ? 'selected' : ""}`
  return classes;
}

starMessage = (e) => {
  e.stopPropagation()
  this.props.toggleStar(this.props.message, 'starred')
}

Labels = ({label}) => {
  return (
    <span className="label label-warning">{label}</span>
  )
}

render() {
  const messageSubject = this.props.message.subject;
    // console.log('this is '+ messageSubject)
  const readClass = this.props.message.read ? 'true' : 'false';

return(
    <div onClick={()=>this.props.toggleProperty(this.props.message, "selected")} className={this.classes()}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input
              type="checkbox"
              readOnly={true} checked={ !!this.props.message.selected}
            />
          </div>
          <div className="star-container col-xs-2">
            <i className={this.props.message.starred ? 'star fa fa-star':'star fa fa-star-o'} onClick={this.starMessage}></i>
          </div>
        </div>
      </div>
    <div className="col-xs-11">
        {this.props.message.labels.map((label, i) => <this.Labels key={i} label={label} /> )}
        {JSON.stringify(messageSubject)}
      </div>
    </div>
    )
  }
}


export default Message;
