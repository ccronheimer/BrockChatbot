import React from 'react'
import { v4 as uuidv4 } from "uuid";

const ChatInput = (props) => {
  return (
    <div className="chat-input-container"> 
          <button className="chip" onClick={() => props.handleAdd("Today's Games","user", uuidv4())}> Today's games </button>
          <button className="chip" onClick={() => props.handleAdd("Schedule","user", uuidv4())}> Schedule </button>
          <button className="chip" onClick={() => props.handleAdd("Find an athlete", "user",uuidv4())}> Find an athlete</button>
          <button className="chip" onClick={() => props.handleAdd("Stats", "user",uuidv4())}> Stats </button>
          <button className="chip" onClick={() => props.handleAdd("Location", "user",uuidv4())}> Where are the games?</button>
      </div>
  )
}

export default ChatInput