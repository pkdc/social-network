import { useRef } from "react";
import Card from "../UI/Card";
import CreatePostTextarea from "../UI/CreatePostTextarea";
import SmallButton from "../UI/SmallButton";
import CreatePostSelect from "../UI/CreatePostSelect";
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

    const privacyOptions = [
        {value: "public", text: "Public"},
        {value: "private", text: "Private"},
        {value: "almost-private", text: "Almost Private"}
    ];

    return <form onSubmit={SubmitHandler}>
        {/* <div>
            <label htmlFor="title">Title</label>
            <input type='text' required id="title" ref={titleInput}/>
        </div> */}
        <Card className={classes.card}>
            <div className={classes["content-container"]}>
                <div>
                    <CreatePostTextarea className={classes.content} placeholder="What's on your mind?" ref={contentInput} rows="4"/>
                </div>
                <div>
                    <CreatePostSelect options={privacyOptions} className={classes["privacy"]}/>
                </div>
            </div>
        
        <div className={classes.btn}>
            <SmallButton>Post</SmallButton>
        </div>
        </Card>
      
         
    </form>
}

export default CreatePost;