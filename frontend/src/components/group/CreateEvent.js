import { useState } from "react";
import Card from "../UI/Card";
import SmallButton from "../UI/SmallButton";

import classes from './CreateEvent.module.css';

function CreateEvent( {groupid} ) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    function SubmitHandler(event) {
        event.preventDefault();

        const currUserId = localStorage.getItem("user_id");

        const datenow =  Date.now()

        const created = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }).format(datenow);

        const data = {
            id: 0,
            groupid: parseInt(groupid),
            author: parseInt(currUserId),
            title: title,
            description: description,
            createdat: created,
            date: date
        };

        setTitle('');
        setDescription('');
        setDate('');
    
        fetch('http://localhost:8080/group-event', 
        {
            
            method: 'POST',
            credentials: "include",
            mode: 'cors',
            body: JSON.stringify(data),
            headers: { 
                'Content-Type': 'application/json' 
            }
        }).then(() => {
            // navigate.replace('/??')
            console.log("event posted")
        })
    }

    return <Card className={classes.card}>
        Create Event
            <form className={classes.container} onSubmit={SubmitHandler}>
        <input type="text" name="title" id="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}></input>
        <textarea className={classes.content} name="description" id="description" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
        <input type="datetime-local" name="date" id="date" value={date} onChange={e => setDate(e.target.value)}></input>
        <div className={classes.btn}>
            <SmallButton>Create</SmallButton>
        </div>
    </form>
    </Card>
}

export default CreateEvent;
