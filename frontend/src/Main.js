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
  const [loading, setLoading] = useState(false);
  const [canInput, setInput] = useState(false);
  const [type, setType] = useState("");

  const [filteredResults, setFilteredResults] = useState([]);

  const initQuestions = [
    "Find an athlete",
    "What is the schedule?",
    "Who can I contact?",
    "Find tickets",
    "Medal standings",
    "When do the games start?"
  ];

  const initMessages = [
    { message: "How can I help you today?", from: "bot", id: uuidv4() },
  ];

  const [list, setList] = useState(initMessages);
  const [questions, setQuestions] = useState(initQuestions);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  function handleAdd(message, from, id) {
    if (message === "Find an athlete") {
      console.log("find an athlete");
      fetchData("https://summer-games-bot.herokuapp.com/athletes");
      setQuestions([
        "Search by name",
        "Search by sport",
        "Search by home town",
        "Go back",
      ]);
      setType("Athlete");
    }

    if (message === "What is the schedule?") {
      console.log("find schedule");
      fetchData("https://summer-games-bot.herokuapp.com/schedule");
      setQuestions(["Search by location", "Search by sport", "Go back"]);
      setType("Schedule");
    }

    if (message === "Medal standings") {
      console.log("find standings");
      fetchData("https://summer-games-bot.herokuapp.com/medals");
      setQuestions(initQuestions);
      setType("Medal"); 
    }
    // adds the message
    const newMessages = list.concat({ message, from, id });
    setList(newMessages);
  }

  const fetchData = (url) => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);

        if(url === "https://summer-games-bot.herokuapp.com/medals") {
          setMedals(response.data)

        }
        
   
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        //   setLoading(false);
      });
  };

  const addData = (res) => {
    setFilteredResults(res);
  };


  const setMedals = (data) => {

    setTimeout(() => {
      setInput(false);
      setQuestions(initQuestions);
      setLoading(false);
      handleAdd(data, "bot", uuidv4());
      setType("Medal"); 
    }, 1000);
    //console.log(data)

  }


  const delay = () => {
    setTimeout(() => {

      // list.pop();
      // get data
      // then go on to search
      // data comes back filtered
      // then we add it to messages
      setInput(false);
      setQuestions(initQuestions);
      setLoading(false);
      // not results
      if (filteredResults.length === 0) {
        handleAdd(
          "Sorry, I could not find what you are looking for",
          "bot",
          uuidv4()
        );
      } else {
        handleAdd(filteredResults, "bot", uuidv4());
      }
      // setDisabled(false);

      //setDisabled(false);
    }, 1000);
  };

  const botRespond = (message, isInput) => {
    setTimeout(() => {
      handleAdd(message, "bot", uuidv4());
      setLoading(false);
      if (isInput) {
        setInput(true);
      }

      if (message === "What else can I help you with?") {
        setQuestions(initQuestions);
      }
      if (message === "Would you like to see Canada games socials? Or buy merch?") {
        setQuestions(["Buy merch", "Instagram", "Facebook", "Youtube", "Tiktok", "Twitter", "Go back"]);
      }
    }, 1000);
  };

  // called when list is updated from user
  useEffect(() => {
    const thisMessage = list[list.length - 1];

    // check if the last question is from user
    if (thisMessage.from === "user") {
      console.log("bot is thinking");

      // cases...
      if (thisMessage.message === "Find an athlete") {
        botRespond("Do you want to search by name or sport?", false);
        //refetch(); // fetch athlete data

        // setDisabled(true); // close chips open input
      }
      // filter through names
      if (thisMessage.message === "Search by name") {
        botRespond("Please enter a name", true);
      }
      if (thisMessage.message === "Search by sport") {
        botRespond("Please enter a sport", true);
      }
      if (thisMessage.message === "Search by home town") {
        botRespond("Please enter a hometown", true);
      }

      // schedule
      if (thisMessage.message === "What is the schedule?") {
        botRespond("Do you want to search by location or sport", false);
      }

      if (thisMessage.message === "Search by sport") {
        botRespond("Please enter a sport?", true);
      }

      if (thisMessage.message === "Search by location") {
        botRespond("Please enter a location", true);
      }
      if (thisMessage.message === "Go back") {
        botRespond("What else can I help you with?", false);
      }
      if (thisMessage.message === "Who can I contact?") {
        botRespond("Would you like to see Canada games socials? Or buy merch?", false);
      }

      if (thisMessage.message === "Find tickets") {
        botRespond("Here you go", false);
        window.open("https://tournkey.app/dashboard/ticket/events/e9GN0yhYf5wRy5VCIa5HsQ", '_blank').focus();
      }

      if (thisMessage.message === "Buy merch") {
        botRespond("Here you go", false);
        window.open("https://shop.niagara2022games.ca/pages/contact-regattasport", '_blank').focus();
      }

      if (thisMessage.message === "Facebook") {
        botRespond("Here you go", false);
        window.open("https://www.facebook.com/2022CanadaGames/", '_blank').focus();
      }

      if (thisMessage.message === "Youtube") {
        botRespond("Here you go", false);
        window.open("https://www.youtube.com/channel/UCpWP6p7_J_aWuP8TpbTQJnA", '_blank').focus();
      }
      if (thisMessage.message === "Tiktok") {
        botRespond("Here you go", false);
        window.open("https://www.tiktok.com/@niagara2022", '_blank').focus();
      }
      if (thisMessage.message === "Twitter") {
        botRespond("Here you go", false);
        window.open("https://twitter.com/2022canadagames", '_blank').focus();
      }
      if (thisMessage.message === "Instagram") {
        botRespond("Here you go", false);
        window.open("https://www.instagram.com/2022canadagames/", '_blank').focus();
      } 

      if (thisMessage.message === "When do the games start?") {
        botRespond("starts Saturday, August 6 and ends on Sunday, August 21", false);
       
      } 


      // added from search 
      if (canInput) {
        delay();
      }

      handleAdd("fetching...", "bot", "temp");

      setLoading(true);
    }

  }, [list]);

  if (error) return <>Error</>;

  return (
    <div className="container">
      <div className="chat-header">
        <img src={SummerGamesImg} width={100} alt="Summer Games" />
        <img src={BrockImg} width={100} alt="Brock" />
      </div>

      <Messages messages={list} type={type} />

      <ChatInput
        handleAdd={handleAdd}
        canInput={canInput}
        data={data}
        addData={addData}
        questions={questions}
        disable={loading}
      />
    </div>
  );
};

export default Main;
