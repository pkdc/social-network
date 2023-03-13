import { useState, useRef } from 'react'

import send from '../../assets/send.svg'
import profile from '../../assets/profile.svg'
import ImgUpload from '../../UI/ImgUpload'
import classes from './CreateComment.module.css'


function CreateComment() {
    const userId = +localStorage.getItem("user_id");
    // const first = localStorage.getItem("fname");
    // const last = localStorage.getItem("lname");
    // const nickname = localStorage.getItem("nname");
    const avatar = localStorage.getItem("avatar");

    const [uploadedCommentImg, setUploadedCommentImg] = useState("");
    const commentInput = useRef();

    function SubmitHandler(event) {
        event.preventDefault();

        const enteredContent = commentInput.current.value

        const postData = {
            content: enteredContent
        };

        console.log(postData)
    }

    const CommentImgUploadHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", () => {
            console.log("comment img", reader.result);
            setUploadedCommentImg(reader.result);
        });
    };

    return <form className={classes.inputWrapper} onSubmit={SubmitHandler}>
        <img src={avatar} alt='' />
    
        <textarea className={classes.input} placeholder="Write a comment" ref={commentInput}/>      
        <ImgUpload className={classes["attach"]} name="comment-image" id="comment-image" accept=".jpg, .jpeg, .png, .gif" text="Attach" onChange={CommentImgUploadHandler}/>
        <button className={classes.send}>
            Send
            {/* <img src={send} alt='' /> */}
        </button>
        {uploadedCommentImg && 
            <figure className={classes["comment-img-preview"]}>
                <img src={uploadedCommentImg} width={"40px"}/>
            </figure>
        }
    </form>
 }

 export default CreateComment;
 