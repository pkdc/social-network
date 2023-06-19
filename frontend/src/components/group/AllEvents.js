import { useEffect, useState } from "react";
import useGet from "../fetch/useGet";
import GroupEvent from "./GroupEvent";

function AllEvents({groupid, refresh}) {
let userid = localStorage.getItem("user_id")
const [ eventData, setEventData ] = useState([])
// const { error, isLoaded, data } = useGet(`/group-event?id=${groupid}&userid=${userid}`)

// if (!isLoaded) return <div>Loading...</div>
// if (error) return <div>Error: {error.message}</div
useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8080/group-event?id=${groupid}&userid=${userid}`);
        const data = await response.json();
        setEventData(data.data);
      } catch (error) {
        console.log(error);
      }
    }
  
    fetchData();
  }, [refresh]);
  

    return <div>
        {eventData && eventData.map((event) => (
         <GroupEvent
        key={event.id}
        id={event.id}
        date={event.date}
        title={event.title}   
        description={event.description}
        />
        ))}
    </div>
}

export default AllEvents;