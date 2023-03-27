import { useState } from "react";
import Card from "../UI/Card";
import SmallButton from "../UI/SmallButton";

import classes from './CreateGroup.module.css';

function CreateGroup() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    function submitHandler(event) {
        event.preventDefault();

        setTitle('');
        setDescription('');

        const data = {
            // id: ?,
            title: title,
            // creator: ?,
            descritption: description,
            // createdat: ?,
        };

        console.log(data)
    
        fetch('https://localhost:8080/group', 
        {
            method: 'POST',
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
        Create Group
            <form className={classes.container} onSubmit={submitHandler}>
        <input type="text" name="title" id="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}></input>
        <textarea className={classes.content} name="description" id="description" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
        <div className={classes.btn}>
            <SmallButton>Create</SmallButton>
        </div>
        
    </form>
    </Card>

}

export default CreateGroup;