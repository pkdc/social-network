import { useRef } from "react";
import Card from "../UI/Card";
import SmallButton from "../UI/SmallButton";

import classes from './CreateEvent.module.css';

function CreateEvent(props) {

    const titleInput = useRef();
    const descInput = useRef();
    const dateInput = useRef();

    function SubmitHandler(event) {
        event.preventDefault();

        const enteredTitle = titleInput.current.value
        const enteredDesc = descInput.current.value
        const enteredDate = dateInput.current.value

        const eventData = {
            title: enteredTitle,
            desc: enteredDesc,
            date: enteredDate
        };

        console.log(eventData)
        props.onCreateEvent('url', eventData)
    }


    return <Card className={classes.card}>
        Create Event
            <form className={classes.container} onSubmit={SubmitHandler}>
        <input type="text" name="title" id="title" placeholder="Title" ref={titleInput}></input>
        <textarea className={classes.content} name="description" id="description" placeholder="Description" ref={descInput}></textarea>
        <input type="datetime-local" name="date" id="date" ref={dateInput}></input>
        <div className={classes.btn}>
            <SmallButton>Create</SmallButton>
        </div>
        
    </form>
    </Card>

}

export default CreateEvent;
