import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import classes from './Post.module.css'
import AllComments from "./comments/AllComments";
import CreateComment from './comments/CreateComment';
import Avatar from '../UI/Avatar';
import Card from '../UI/Card';


function Post(props) {
    const [showComments, setShowComments] = useState(false);
    const navigate = useNavigate();

    // console.log("comment for post: ", props.postNum, " comments: ", props.commentsForThisPost)
    // const onlineStatus = false;
    const postCommentUrl = "http://localhost:8080/post-comment";

    // return <div className={classes.container}>
    const showCommentsHandler = () => {
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
        fetch(postCommentUrl, reqOptions)
        .then(resp => resp.json())
        .then(data => {
            props.onCreateCommentSuccessful(data.success); // lift it up to PostPage
        })
        .catch(err => {
            console.log(err);
        })
    };

    function handleClick(e) {
        const id = e.target.id

        console.log("id: ", id)
        navigate("/profile", { state: { id } })
    }

    var myDate = new Date(props.createdat);
    var mills = myDate.getTime();
    const newDate = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric', month: 'short', year: '2-digit', hour: 'numeric',
        minute: 'numeric',
    }).format(mills);

    return <Card className={classes.container} >
        <div className={classes["author"]}>
            <Link to={`/profile/${props.authorId}`}>
                <Avatar className={classes["post-avatar"]} id={props.authorId} src={props.avatar} alt="" width={"50px"}/>
            </Link>
            <Link to={`/profile/${props.authorId}`}>
                <div><p className={classes["details"]}>{`${props.fname} ${props.lname} ${props.nname}`}</p></div>
            </Link>
        </div>
        <div className={classes["create-at"]}>{newDate}</div>
        {/* <div className={classes["create-at"]}>{props.privacy}</div> //privacy */}
        <div className={classes.content}>{props.message}</div>
        {props.image && <div><img src={props.image} alt="" width={"100px"}/></div>}
        <div className={classes.comments} onClick={showCommentsHandler}>Comments</div>
        {/* {props.commentsForThisPost.length}  */}
        {showComments && 
            <>
                <CreateComment pid={props.id} onCreateComment={createCommentHandler}/> 
                <AllComments comments={props.commentsForThisPost}/>
            </>
        }
    </Card>
}

export default Post