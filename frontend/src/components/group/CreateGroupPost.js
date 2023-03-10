import { useRef } from "react";
import Card from "../UI/Card";
import FormTextarea from "../UI/FormTextarea";
import SmallButton from "../UI/SmallButton";
import classes from './CreateGroupPost.module.css';

function CreateGroupPost(props) {
// const titleInput = useRef();
const contentInput = useRef();

    function SubmitHandler(event) {
        event.preventDefault();

        // const enteredTitle = titleInput.current.value
        const enteredContent = contentInput.current.value

        const postData = {
            // title: enteredTitle,
            content: enteredContent
        };

        console.log(postData)
        props.onCreatePost(postData)
    }

    return <form onSubmit={SubmitHandler}>

        <Card className={classes.card}>
            <textarea className={classes.content} placeholder="What's on your mind?" ref={contentInput} rows="4"/>
      
        <div className={classes.btn}>
            <SmallButton>Post</SmallButton>
        </div>
        </Card>
      
         
    </form>
}

export default CreateGroupPost;
