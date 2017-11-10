import React from 'react'

const Toolbar = ({markAsRead, markAsUnread, applyLabel, removeLabel, deleteMessages, toggleSelectAll, toggleCompose, updateMessages, messages}) => {

const messagesJson = JSON.stringify(messages)
const unreadCount = messages.filter(message => !message.read).length
const selectedCount = messages.filter(message => message.selected).length

let selectAllClass

switch(selectedCount) {
    case 0:
selectAllClass = 'fa-square-o'
    break;
    case messages.length:
selectAllClass = 'fa-check-square-o'
    break;
    default:
selectAllClass = 'fa-minus-square-o'
  }

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{unreadCount}</span>
          unread messages
        </p>

        <button className="btn btn-danger" onClick={toggleCompose}>
          <i className={`fa fa-plus`}></i>
        </button>

        <button onClick={toggleSelectAll} className="btn btn-default">
          <i className="fa fa-minus-square-o"></i>
        </button>

        <button onClick={markAsRead} disabled={selectedCount===0} className="btn btn-default">Mark As Read</button>

        <button onClick={markAsUnread} disabled={selectedCount===0} className="btn btn-default">Mark As Unread</button>

        <select onChange={(e)=>{applyLabel(e.target.value); e.target.selectedIndex=0}} className="form-control label-select">
          <option>Apply label</option>
          <option onClick={applyLabel} value="dev">dev</option>
          <option onClick={applyLabel} value="personal">personal</option>
          <option onClick={applyLabel} value="gschool">gschool</option>
        </select>

        <select onChange={(e)=>{removeLabel(e.target.value); e.target.selectedIndex=0}} className="form-control label-select">
          <option>Remove label</option>
          <option onClick={removeLabel} value="dev">dev</option>
          <option onClick={removeLabel} value="personal">personal</option>
          <option onClick={removeLabel} value="gschool">gschool</option>
        </select>

        <button className="btn btn-default">
          <i onClick = {deleteMessages} className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}
export default Toolbar;
