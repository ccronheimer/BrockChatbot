import React, { useRef, useEffect } from "react";
import Message from "./Message";

const Messages = (props) => {
  const messages = props.messages;
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  
  const listMessages = messages.map(({ message, from, id }) => (
    <Message key={id} message={message} from={from} />
  ));

  return (
    <div className="chat-container">
      {listMessages} <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
