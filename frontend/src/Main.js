import React from "react";
import "./styles.css";
import useFetch from "./useFetch";
import SummerGamesImg from "./assets/sgames.png";
import BrockImg from "./assets/brock.png";

const Main = () => {
  const { data, loading, error, refetch } = useFetch(
    "http://localhost:3001/athletes"
  );

  if (loading) return <div>loading</div>;
  if (error) console.log(error);

  return (
    <div className="container">
      {/* chat header */}
      <div className="chat-header">
        <img src={SummerGamesImg} width={100} alt="Summer Games" />
        <img src={BrockImg} width={100} alt="Brock" />
      </div>

      {/* chat box */}
      <div className="chat-container">
        <div className="bot-container">
          <div className="bot-message-container">
            <div className="bot-profile">🤖</div>
            <div className="bot-message">im a bot</div>
          </div>

          <div className="bot-chips">
            <button className="chip">Today's games</button>
            <button className="chip">Find an athlete</button>
            <button className="chip">Schedule</button>
            
          </div>
        </div>
        <div className="message-user">im user</div>
        <div>
          {/* map messages */}

          {data?.map((athlete) => {
            return <div>{athlete.athlete}</div>;
          })}
        </div>
      </div>

      {/* <button onClick={refetch}>Refetch</button> */}

      {/* chat input */}
      {/* chat footer countdown */}
    </div>
  );
};

export default Main;
