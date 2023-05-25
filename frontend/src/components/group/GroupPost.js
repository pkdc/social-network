import classes from './GroupPost.module.css'
import profile from '../assets/profile.svg';
import Card from '../UI/Card';
import { useState } from 'react';
import AllComments from '../posts/comments/AllComments';
import CreateGroupComment from './CreateGroupComment';
import useGet from '../fetch/useGet';

function GroupPost(props) {
    console.log("prosp id2 :",props.id)
    const [commentData, setCommentData] = useState([]);

    const [showComments, setShowComments] = useState(false);

    const showCommentsHandler = (e) => {
        console.log("props id: ",e.target.id)
        fetch(`http://localhost:8080/group-post-comment?id=${e.target.id}`)
        .then(resp => resp.json())
        .then(data => {
            setCommentData(data.data);
            console.log("comments data", data)
        })
        .catch(
            err => console.log(err)
        );


        console.log(showComments);
        !showComments && setShowComments(true);
        showComments && setShowComments(false);
    };

    const createCommentHandler = (createCommentPayloadObj) => {
        console.log("create comment for Post", createCommentPayloadObj)
        
        const reqOptions = {
            method: "POST",
            body: JSON.stringify(createCommentPayloadObj),
        }
        fetch("http://localhost:8080/group-post-comment", reqOptions)
        .then(resp => resp.json())
        .then(data => {
            console.log("create comment success", data.success);
            props.onCreateCommentSuccessful(data.success); // lift it up to PostPage
        })
        .catch(err => {
            console.log(err);
        })
    };

    return <Card className={classes.container} >
          <div className={classes.user}>
            <img src={profile} alt='' />
            <div>
                <div className={classes.username}>{props.fname}</div>
                <div className={classes.date}>{props.createdat}</div>
            </div>
          
        </div>
        <div className={classes.content}>{props.message}</div>
        {/* <div className={classes.comments}>comments</div> */}
        <div className={classes.comments} id={props.id} onClick={showCommentsHandler}>Comments</div>
        {/* {props.commentsForThisPost.length}  */}
        {showComments && commentData &&
            <>
                <AllComments comments={commentData}/>
                <CreateGroupComment pid={props.id} onCreateComment={createCommentHandler}/> 
            </>
        }
    </Card>

      
    // </div>
}

export default GroupPost