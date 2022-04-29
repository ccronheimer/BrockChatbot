import React from "react";

import Table from "./Table";

const Message = (props) => {

  var c = [{}]

  // our columns based off of data type
  if(props.type === "Athlete") {
   c = [
      {
        Header: 'Athlete',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Sport',
        accessor: 'sport',
      },
      {
        Header: 'Home',
        accessor: "hometown"
      },
      {
        Header: 'Height',
        accessor: "height"
      },
      {
        Header: 'Weight',
        accessor: "weight"
      },
    ]
  }

  if(props.type === "Schedule") {
    c = [
      {
        Header: 'Gender',
        accessor: "gender"
      },
      {
        Header: 'Sport',
        accessor: "sport"
      },
      {
         
        Header: 'Time',
        accessor: 'time', // accessor is the "key" in the data
      },
       {
        Header: 'Location',
        accessor: 'location',
       },
      
       {
         Header: 'Pool',
         accessor: "pool"
       },
     ]
   }

   if(props.type === "Medal") {
    c = [
      {
        Header: 'Contingent',
        accessor: "Contingent"
      },
      {
        Header: 'Gold',
        accessor: "Gold"
      },
      {
         
        Header: 'Silver',
        accessor: 'Siver', // accessor is the "key" in the data
      },
       {
        Header: 'Bronze',
        accessor: 'Bronze',
       },
      
       {
         Header: 'Total',
         accessor: "Total"
       },
     ]
   }
  

    const columns = React.useMemo(
        () => c,
        []
      )
    
      console.log(props.type)
  

 // once we get data then bot message is sent
  if (props.from === "bot") {
    return (
      <div className="bot-message-container">
        <div className="bot-profile">🤖</div>
        <div className="bot-message">
          
          {props.message === "fetching..." ? (
            <div className="loading"></div>
          ) : (
            <>
              {/* response + data */}
              {Array.isArray(props.message) ? (
                <>
                  <Table columns={columns} data={props.message} type={props.type}/>
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
