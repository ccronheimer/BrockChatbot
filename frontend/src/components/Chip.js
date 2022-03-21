import React from "react";
import { v4 as uuidv4 } from "uuid";

// disable, question, handleaAdd
const Chip = (props) => {
  return (
    <>
      {props.disable ? (

        // disabled 
        <button
          className="chip-disabled"
          disabled={props.disable}
      
        >
          {" "}
          {props.question}{" "}
        </button>
      ) : (

        // not disabled
        <button
          className="chip"
          disabled={props.disable}
          onClick={() => props.handleAdd(props.question, "user", uuidv4())}
        >
          {" "}
          {props.question}{" "}
        </button>
      )}
    </>
  );
};

export default Chip;
