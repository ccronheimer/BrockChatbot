import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const SearchBar = (props) => {
  const data = props.data;


  const [searchInput, setSearchInput] = useState("");
  
  // the filter
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
  };

  const addFilterdRes = () => {
    const filteredData = data.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      props.addData(filteredData);

  }
  return (
    <div >
      {" "}
      <input className="chat-input"
        placeholder="Search"
        onChange={(e) => searchItems(e.target.value)}
      />
      <button className="chip"onClick={() => {props.handleAdd(searchInput, "user", uuidv4()); addFilterdRes()} }>
        {" "}
        Search{" "}
      </button>
    </div>
  );
};

export default SearchBar;
