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
  const [disable, setDisabled] = useState(false);
  const [canInput, setInput] = useState(false);

  const [filteredResults, setFilteredResults] = useState([]);

  const initQuestions = [
    "Today's Games",
    "Schedule",
    "Find an athlete",
    "Stats",
    "Location",
  ];

  const initMessages = [
    { message: "How can I help you today?", from: "bot", id: uuidv4() },
  ];

  const [list, setList] = useState(initMessages);
  const [questions, setQuestions] = useState(initQuestions);
  
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

 

  const addData = (res) => {
    setFilteredResults(res);   
    
  }

 
  // we have the data
  useEffect(() => {

    if (filteredResults.length !== 0) {
      // update the list for answer
      setTimeout(() => {
        console.log(filteredResults);

       // list.pop();
        // get data 
        // then go on to search
        // data comes back filtered 
        // then we add it to messages 
        setInput(false);
        setQuestions(initQuestions)
        handleAdd(filteredResults, "bot", uuidv4());
        setDisabled(false);


        //setDisabled(false);
      }, 2000);
    } 

   

  }, [filteredResults]);


  // called when list is updated from user
  useEffect(() => {

    const thisMessage = list[list.length - 1];

    // check if the last question is from user
    if (thisMessage.from === "user") {
      console.log("bot is thinking");

      // cases... 
      if (thisMessage.message === "Find an athlete") {
        handleAdd("Who are you looking for?", "bot", uuidv4());
        refetch(); // fetch athlete data 
       // setDisabled(true); // close chips open input
        setQuestions(["Athlete Name", "Athlete Sport"])
      } else if(thisMessage.message === "Athlete Name") {
        handleAdd("Enter a name?", "bot", uuidv4());
        // filter through names
        setInput(true);


      } else if(thisMessage.message === "Athlete Sport") {
        
        handleAdd("Enter a sport?", "bot", uuidv4());
        setInput(true);

        
      }else {
        
        // received user input so find a answer

        handleAdd("fetching...", "bot", "temp");
        setDisabled(true);

       

      }


    }

    console.log(thisMessage.message)
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
      <ChatInput handleAdd={handleAdd} canInput={canInput} data={data} addData={addData} questions={questions} disable={disable} />
    </div>
  );
};

export default Main;
