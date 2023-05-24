import useGet from "../fetch/useGet";
import GroupEvent from "./GroupEvent";

function AllEvents({groupid}) {

const { error, isLoaded, data } = useGet(`/group-event?id=${groupid}`)

if (!isLoaded) return <div>Loading...</div>
if (error) return <div>Error: {error.message}</div>

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