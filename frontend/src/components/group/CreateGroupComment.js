import { useState, useRef } from 'react'
import { Link } from "react-router-dom";
import send from '../assets/send.svg'
import profile from '../assets/profile.svg'
import classes from './CreateComment.module.css'
import Avatar from '../UI/Avatar'


function CreateGroupComment(props) {
    const userId = +localStorage.getItem("user_id");
    const avatar = localStorage.getItem("avatar");

    const commentInput = useRef();
    // const [commentMsg, setCommentMsg] = useState("");

    function SubmitHandler(event) {
        event.preventDefault();

        const enteredContent = commentInput.current.value

        const commentData = {
            postId: props.pid,
            userId: userId, // author
            message: enteredContent,
        };

        // console.log("create comment: ", commentData)

        props.onCreateComment(commentData);

        commentInput.current.value = "";
    }


    return <form className={classes.inputWrapper} onSubmit={SubmitHandler}>
        <Link to={`/profile/${userId}`} className={classes["author"]}>
            <Avatar className={classes["avatar"]} src={props.avatar} alt="" width={"50px"}/>
        </Link>
        <textarea className={classes.input} placeholder="Write a comment" ref={commentInput}/>      
        <div className={classes["functions"]}>
            <div className={classes["attach"]}>
            </div>
            <button className={classes.send}>
                <img src={send} alt='' />
            </button>
        </div>
      
    </form>
 }

 export default CreateGroupComment;
 