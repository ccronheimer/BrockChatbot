import React, { useState, useRef } from "react";
import "./styles.css";
import { FaArrowUp } from "react-icons/fa";
function App() {
  const [inputText, setInputText] = useState({message: "", from: "user"});
  const [messages, setNewMessage] = useState([{message: "How can I help you?", from: "bot"}]);
  

  const addMessage = (e) => {
    e.preventDefault();
    setNewMessage([...messages, inputText]);
    console.log(messages);
  };


  return (
    <div className="container">
    <div className="chat-title">Chatbot</div>
      <div className="chat-container">
        <div className="chat">
          <MessageList messages={messages} />
        </div>
      </div>
      <div id="myInput" className="chat-input-container">

        <input
          onKeyPress={(event) => {if (event.key === "Enter") {addMessage(event)}}}
          className="chat-input" 
          onChange={(e) => {
            setInputText({message: e.target.value, from: "user"});
          }}
          placeholder="Enter Question!"
        />
        <div id="myBtn" className="add-question-button" onClick={addMessage} >
          <FaArrowUp />
        </div>
      </div>
    </div>
  );
}

function MessageList(props) {
  const messages = props.messages;
  const listMessages = messages.map(({message,from}) => (
    <Message key={(message+Date.now()).toString()} value={message} from={from} />
  ));

  return <div>{listMessages}</div>;
}

function Message(props) {
  return<div className={"message-"+props.from+"-container"}>{props.from==="bot" && (<div className="bot-profile">🤖</div>)}<div className={"message-"+props.from}>{props.value}</div></div>;
}

export default App;
