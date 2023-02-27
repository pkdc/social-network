import { useRef } from "react";
import Card from "../UI/Card";
import CreatePostTextarea from "../UI/CreatePostTextarea";
import SmallButton from "../UI/SmallButton";
import CreatePostSelect from "../UI/CreatePostSelect";
import classes from './CreatePost.module.css';

function CreatePost(props) {
// const titleInput = useRef();
const contentInput = useRef();
const privacyInputRef = useRef();

    function SubmitHandler(event) {
        event.preventDefault();
        // console.log(contentInput.current.value);
        // console.log(privacyInputRef.current.value);

        const enteredContent = contentInput.current.value
        const chosenPrivacy = privacyInputRef.current.value;

        const postData = {
            user_id: 1,
            content: enteredContent,
            privacy: chosenPrivacy
        };

        console.log("create post data", postData)

        props.onCreatePost(postData)

        contentInput.current.value = "";
        privacyInputRef.current.value = "public";
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
                    <CreatePostTextarea className={classes.content} placeholder="What's on your mind?" reference={contentInput} rows="3"/>
                </div>
                <div>
                    <CreatePostSelect options={privacyOptions} className={classes["privacy"]} reference={privacyInputRef}/>
                </div>
            </div>
        
        <div className={classes.btn}>
            <SmallButton>Post</SmallButton>
        </div>
        </Card>
      
         
    </form>
}

export default CreatePost;