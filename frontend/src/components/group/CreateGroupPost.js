import { useRef } from "react";
import Card from "../UI/Card";
import FormTextarea from "../UI/FormTextarea";
import SmallButton from "../UI/SmallButton";
import classes from './CreateGroupPost.module.css';
import profile from '../assets/profile.svg';


function CreateGroupPost(props) {
const contentInput = useRef();

    function SubmitHandler(event) {
        event.preventDefault();

        const enteredContent = contentInput.current.value
        const postData = {
            content: enteredContent
        };

        fetch('https://social-network-cffc1-default-rtdb.firebaseio.com/groupposts.json', 
        {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: { 
                'Content-Type': 'application/json' 
            }
        }).then(() => {
            // navigate.replace('/??')
            console.log("posted")
        })
        console.log(postData)
        // props.onCreatePost('https://social-network-cffc1-default-rtdb.firebaseio.com/groupposts.json', postData)
    }

return <form className={classes.container} onSubmit={SubmitHandler}>
        <Card>
            <div className={classes.row}>
                <img src={profile} alt='' />
                <textarea className={classes.content} placeholder="What's on your mind?" ref={contentInput} rows="1"/>
            </div>
      
        <div className={classes.btn}>
            <SmallButton>Post</SmallButton>
        </div>
        </Card>     
    </form>
}

export default CreateGroupPost;
