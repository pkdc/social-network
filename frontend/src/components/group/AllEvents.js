import useGet from "../fetch/useGet";
import GroupEvent from "./GroupEvent";

function AllEvents() {

const { data } = useGet("/group-event")
console.log("event data", data)

    return <div>
        {data.map((event) => (
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