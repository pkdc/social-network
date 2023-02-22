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
            <div className={classes["content-container"]}>
                <textarea className={classes.content} placeholder="What's on your mind?" ref={contentInput} rows="4"/>
                <div className={classes["privacy"]}>
                    <label htmlFor="privacy"></label>
                    <select name="privacy" id="privacy">
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="almost-private">Almost Private</option>
                    </select>
                </div>
            </div>
        
        <div className={classes.btn}>
            <SmallButton>Post</SmallButton>
        </div>
        </Card>
      
         
    </form>
}

export default CreatePost;