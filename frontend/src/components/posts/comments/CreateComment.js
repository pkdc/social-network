import { useRef } from 'react'

import send from '../../assets/send.svg'
import profile from '../../assets/profile.svg'

import classes from './CreateComment.module.css'


function CreateComment() {

    const commentInput = useRef();

    function SubmitHandler(event) {
        event.preventDefault();

        const enteredContent = commentInput.current.value

        const postData = {
            content: enteredContent
        };

        console.log(postData)
    }
    return <form className={classes.inputWrapper} onSubmit={SubmitHandler}>
     <img src={profile} alt='' />
 
     <textarea className={classes.input} placeholder="Write a comment" ref={commentInput}/>      
     <button className={classes.send}>
         <img src={send} alt='' />
     </button>
 </form>
 }

 export default CreateComment;
 