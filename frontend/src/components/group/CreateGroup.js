import { useState } from "react";
import Card from "../UI/Card";
import SmallButton from "../UI/SmallButton";

import classes from './CreateGroup.module.css';

function CreateGroup() {

    const currUserId = localStorage.getItem("user_id");
    const currId = parseInt(currUserId);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    console.log({title})

    function submitHandler(event) {

        console.log("sssdsdeqfe")
        event.preventDefault();

        const date =  Date.now()

        // const created = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }).format(date);

        const data = {
            id: 0,
            title: title,
            creator: currId,
            description: description,
            createdat: date,
        };

        console.log({data})

        setTitle('');
        setDescription('');
    
        fetch('http://localhost:8080/group', 
        {
            method: 'POST',
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(data),
            headers: { 
                'Content-Type': 'application/json' 
            }
        }).then(() => {
            // navigate.replace('/??')
            console.log("group posted")
        })
    }

    return <Card className={classes.card}>
        Create Group
            <form className={classes.container} onSubmit={submitHandler}>
        <input type="text" name="title" id="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}></input>
        <textarea className={classes.content} name="description" id="description" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
        <div className={classes.btn}>
            <button>Create</button>
        </div>
        
    </form>
    </Card>

}

export default CreateGroup;