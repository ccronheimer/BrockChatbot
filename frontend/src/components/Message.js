import React from "react";
import useFetch from "../useFetch";

const Message = (props) => {
  if (props.from === "bot") {
    return (
      <div className="bot-message-container">
        <div className="bot-profile">🤖</div>
        <div className="bot-message">
          {props.message === "fetching..." ? (
            <div className="loading">Searching</div>
          ) : (
            props.message
          )}
        </div>
      </div>
    );
  }

  if (props.from === "user") {
    return <div className="message-user">{props.message}</div>;
  }
};

export default Message;
