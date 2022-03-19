import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import { FaArrowUp } from "react-icons/fa";


function App() {
  const [inputText, setInputText] = useState({ message: "", from: "user" });
  const [messages, setNewMessage] = useState([
    { message: "How can I help you?", from: "bot" },
  ]);

  const dummy = useRef();

  // add a new message
  const addMessage = (e) => {
    e.preventDefault();
    setNewMessage([...messages, inputText]);

    dummy.current.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      addMessageBot();
    }, 1000);

    console.log(messages);
  };

  const chipPressed = (param) => {
    setNewMessage([...messages, { message: `${param}`, from: "user" }]);

    dummy.current.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      addMessageBot();
    }, 1000);
  };

  const addMessageBot = () => {
    setNewMessage([...messages, { message: `finding...`, from: "bot" }]);

    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="container">

     


      <div className="chat-container">
        <div className="chat">
          <MessageList messages={messages} chipPressed={chipPressed} />
          <div className="scrollInto" ref={dummy}></div>
        </div>
      </div>

      <div id="myInput" className="chat-input-container">
        <input
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              addMessage(event);
            }
          }}
          className="chat-input"
          onChange={(e) => {
            setInputText({ message: e.target.value, from: "user" });
          }}
          placeholder="Enter Question!"
        />
        <div id="myBtn" className="add-question-button" onClick={addMessage}>
          <FaArrowUp />
        </div>
      
      </div>
    
    </div>
  );
}

function MessageList(props) {
  const messages = props.messages;

  const listMessages = messages.map(({ message, from }, index) => (
    <Message
      key={index}
      value={message}
      from={from}
      chipPressed={props.chipPressed}
    />
  ));

  return <div>{listMessages}</div>;
}

function Message(props) {
  return (
    <div className={"message-" + props.from + "-container"}>
       <div className="message-pro-container">
        {props.from === "bot" && <div className="bot-profile">🤖</div>}
        <div className={"message-" + props.from}>{props.value}</div>
      </div>

      {props.from === "bot" && (
        <div className="chips">
          <button className="chip" onClick={() => props.chipPressed("History")}>
            History
          </button>
          <button
            className="chip"
            onClick={() => props.chipPressed("Schedule")}
          >
            Schedule
          </button>
          <button className="chip" onClick={() => props.chipPressed("Stats")}>
            Stats
          </button>
          <button className="chip" onClick={() => props.chipPressed("Location")}>
            Location
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
