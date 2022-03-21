import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Chip from "./Chip";
import SearchBar from "./SearchBar";

const ChatInput = (props) => {
  // const tableInstance = useRef(null);

  const questions = props.questions;

  const listQuestions = questions.map((question) => (
    <Chip
      key={uuidv4()}
      question={question}
      disable={props.disable}
      handleAdd={props.handleAdd}
    />
  ));

  return (
    <div className="chat-input-container">
      {props.canInput ? (
        <SearchBar data={props.data} addData={props.addData} handleAdd={props.handleAdd} />
      ) : (
         listQuestions 
      )}

      {/* where the search needs to be */}
    </div>
  );
};

export default ChatInput;
