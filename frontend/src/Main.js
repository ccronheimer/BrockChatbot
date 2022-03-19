import React, { useEffect, useState } from "react";
import "./styles.css";
import useFetch from "./useFetch";
import SummerGamesImg from "./assets/sgames.png";
import BrockImg from "./assets/brock.png";
import Messages from "./components/Messages";
import ChatInput from "./components/ChatInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const Main = () => {
  const initMessages = [
    { message: "How can I help you?", from: "bot", id: uuidv4() },
  ];

  const [list, setList] = useState(initMessages);

  // we will have data pre loaded since it is not much

  // add message
  function handleAdd(message, from, id) {
    const newMessages = list.concat({ message, from, id });
    setList(newMessages);
  }

  // ahtlete search
  const { data, loading, error, refetch } = useFetch(
    "http://localhost:3001/athletes"
  );

  // we have a answer
  useEffect(() => {
    if (data != null) {
      console.log(data);
      // update the list for answer
      list.pop(); 
      handleAdd(JSON.stringify(data), "bot", uuidv4());
    }
  }, [data]);



  // get the users questions
  useEffect(() => {
    // check if the last question is from user
    if (list[list.length - 1].from === "user") {
      console.log("bot is thinking");

      // if question is for atheletes fetch athletes data
      refetch();
      // find a answer (loading)
      handleAdd("fetching...", "bot", "temp");

      // grey out input while waiting for answers 
    }
  }, [list]);

  // if (loading) return <div>loading...</div>;
  // if (error) console.log(error);

  return (
    <div className="container">
      {/* chat header */}
      <div className="chat-header">
        <img src={SummerGamesImg} width={100} alt="Summer Games" />
        <img src={BrockImg} width={100} alt="Brock" />
      </div>

      <Messages messages={list} />
      {/* 
      {data?.map((athlete) => {
        return <div>{athlete.athlete}</div>;
      })} */}
      {/* <button onClick={refetch}>Refetch</button> */}

      {/* chat input */}
      <ChatInput handleAdd={handleAdd} />
    </div>
  );
};

export default Main;
