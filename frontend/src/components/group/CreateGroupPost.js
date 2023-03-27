import { useState } from "react";
import Card from "../UI/Card";
import FormTextarea from "../UI/FormTextarea";
import SmallButton from "../UI/SmallButton";
import classes from './CreateGroupPost.module.css';
import profile from '../assets/profile.svg';


function CreateGroupPost() {

const [ message, setMessage ] = useState('')

    function SubmitHandler(event) {
        event.preventDefault();
        setMessage('');

        const date =  Date.now()
        console.log('date', date);

        const created = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }).format(date);


        const data = {
            id: 0,
            author: "username",
            message: message,
            // image: ?,
            createdat: created,
        };

        fetch('https://localhost:8080/group-post', 
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 
                'Content-Type': 'application/json' 
            }
        }).then(() => {
            // navigate.replace('/??')
            console.log("posted")
        })
        console.log(data)
    }

return <form className={classes.container} onSubmit={SubmitHandler}>
        <Card>
            <div className={classes.row}>
                <img src={profile} alt='' />
                <textarea className={classes.content} placeholder="What's on your mind?" rows="1" value={message} onChange={e => setMessage(e.target.value)}/>
            </div>
      
        <div className={classes.btn}>
            <SmallButton>Post</SmallButton>
        </div>
        </Card>     
    </form>
}

export default CreateGroupPost;
