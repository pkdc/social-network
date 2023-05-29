import useGet from "../fetch/useGet";
import GroupEvent from "./GroupEvent";

function AllEvents({groupid}) {
let userid = localStorage.getItem("user_id")
const { error, isLoaded, data } = useGet(`/group-event?id=${groupid}&userid=${userid}`)

if (!isLoaded) return <div>Loading...</div>
if (error) return <div>Error: {error.message}</div>

console.log("data test", data.data)

    return <div>
        {data.data && data.data.map((event) => (
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