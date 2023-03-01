import { useRef } from "react";
import Card from "../UI/Card";
import FormTextarea from "../UI/FormTextarea";
import SmallButton from "../UI/SmallButton";
import classes from './CreatePost.module.css';

function CreatePost(props) {
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
        {/* <div>
            <label htmlFor="title">Title</label>
            <input type='text' required id="title" ref={titleInput}/>
        </div> */}
        <Card className={classes.card}>
         {/* <label htmlFor="content">Post Label</label> */}
            <textarea className={classes.content} placeholder="What's on your mind?" ref={contentInput} rows="4"/>
            {/* <textarea id='content' placeholder="What's on your mind?"  cols='60' ref={contentInput}></textarea> */}
      
        <div className={classes.btn}>
            <SmallButton>Post</SmallButton>
        </div>
        </Card>
      
         
    </form>
}

export default CreatePost;