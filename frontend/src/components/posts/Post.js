import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import classes from './Post.module.css'
// import profile from '../assets/profile.svg';
import AllComments from "./comments/AllComments";
import CreateComment from './comments/CreateComment';
import Avatar from '../UI/Avatar';
import Card from '../UI/Card';
// import AllComments from './comments/AllComments';


function Post(props) {
    const [showComments, setShowComments] = useState(false);

    // console.log("comment for post: ", props.postNum, " comments: ", props.commentsForThisPost)

    const defaultImagePath = "default_avatar.jpg";
    const postCommentUrl = "http://localhost:8080/post-comment"; // temp

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
            console.log("create comment success", data.success);
            props.onCreateCommentSuccessful(data.success); // lift it up to PostPage
        })
        .catch(err => {
            console.log(err);
        })
    };

    return <Card className={classes.container} >
        <div className={classes["author"]}>
            <Link to={`/profile/${props.authorId}`}>
                {!props.avatar && <Avatar className={classes["post-avatar"]} src={require("../../images/"+`${defaultImagePath}`)} alt="" width={"50px"}/>}
                {props.avatar && <Avatar className={classes["post-avatar"]} src={props.avatar} alt="" width={"50px"}/>}
            </Link>
            <Link to={`/profile/${props.authorId}`}>
                <div><p className={classes["details"]}>{`${props.fname} ${props.lname} (${props.nname})`}</p></div>
            </Link>
        </div>
        <div className={classes["create-at"]}>{props.createdat.split(".")[0]}</div>
        <div className={classes.content}>{props.message}</div>
        {props.image && <div><img src={props.image} alt="" width={"100px"}/></div>}
        <div className={classes.comments} onClick={showCommentsHandler}>{props.commentsForThisPost.length} Comments</div>
        {showComments && 
            <>
                <AllComments comments={props.commentsForThisPost}/>
                <CreateComment pid={props.id} onCreateComment={createCommentHandler}/> 
            </>
        }
    </Card>
}

export default Post