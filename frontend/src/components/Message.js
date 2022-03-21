import React from "react";

import Table from "./Table";

const Message = (props) => {
    const columns = React.useMemo(
        () => [
          {
            Header: 'Athlete',
            accessor: 'athlete', // accessor is the "key" in the data
          },
          {
            Header: 'Sport',
            accessor: 'sport',
          },
        ],
        []
      )

 // once we get data then bot message is sent
  if (props.from === "bot") {
    return (
      <div className="bot-message-container">
        <div className="bot-profile">🤖</div>
        <div className="bot-message">
          
          {props.message === "fetching..." ? (
            <div className="loading">Searching</div>
          ) : (
            <>
              {/* response + data */}
              {Array.isArray(props.message) ? (
                <>
                  {/* props.message.map((athlete, index) => {
                    return (
                      <>

                        <li key={index}>
                          {athlete.athlete} {athlete.sport}
                        </li>
                      </>
                    );
                  }) */}
                  <Table columns={columns} data={props.message} />
                </>
              ) : (
                props.message
              )}
            </>
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

//{"_id":"62002987fde4658248b50a48","athlete":"Logan Aalders","sport":"Wheelchair Basketball","key":"Logan AaldersWheelchair Basketball"},{"_id":"62002987fde4658248b50a49","athlete":"Michael Abgrall","sport":"Hockey","key":"Michael AbgrallHockey"},{"_id":"62002987fde4658248b50a4a","athlete":"Jumana Abouelela","sport":"Squash","key":"Jumana AbouelelaSquash"},{"_id":"62002987fde4658248b50a4b","athlete":"Rawan Abouelela","sport":"Squash","key":"Rawan AbouelelaSquash"}
