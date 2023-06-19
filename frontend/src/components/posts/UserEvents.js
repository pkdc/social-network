import { useEffect, useState } from "react";
import useGet from "../fetch/useGet";
import UserEvent from "./UserEvent";

function UserEvents({ userId, refresh }) {

    const [eventData, setEventData] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8080/group-event-member?userid=${userId}`)
            .then(resp => resp.json())
            .then(data => {
                console.log("showtime", data)
                setEventData(data.data)
            })
            .catch(
                err => console.log(err)
            );
    }, [refresh]);


    // console.log("data test", data.data)

    return <div>
        {eventData && eventData.map((event) => (
            <UserEvent
                key={event.id}
                id={event.id}
                date={event.date}
                title={event.title}
                description={event.description}
                groupid={event.groupid}
            />
        ))}
    </div>

}

export default UserEvents;