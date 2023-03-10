import GroupEvent from "./GroupEvent";

function AllEvents(props) {
    return <div>
        {props.events.map((event) => (
         <GroupEvent
        key={event.id}
        id={event.id}
        date={event.date}
        title={event.title}   
        desc={event.desc}
        />
        ))}
    </div>
}

export default AllEvents;