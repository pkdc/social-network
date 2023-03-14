import classes from './Post.module.css'
// import profile from '../assets/profile.svg';
import AllComments from "./comments/AllComments";
import CreateComment from './comments/CreateComment';
import Avatar from '../UI/Avatar';
import Card from '../UI/Card';
import { useEffect, useState } from 'react';

function Post(props) {
    const [showComments, setShowComments] = useState(false);
    const [commentData, setCommentData] = useState("");

    const defaultImagePath = "default_avatar.jpg";
    const postCommentUrl = "http://localhost:8080/post-comment";

    // return <div className={classes.container}>
    const showCommentsHandler = () => {
        console.log(showComments);
        !showComments && setShowComments(true);
        showComments && setShowComments(false);
    };

    const createCommentHandler = (createCommentPayloadObj) => {
        // post req

    };

    useEffect(() => {
        fetch(postCommentUrl)
        .then(resp => resp.json())
        .then(data => {
            console.log("comment data: ", data)
            setCommentData(data);
        })
        .catch(
            err => console.log(err)
        );
    }, []);
    

    return <Card className={classes.container} >
            <div className={classes["author"]}>
                {!props.avatar && <Avatar className={classes["post-avatar"]} src={require("../../images/"+`${defaultImagePath}`)} alt="" width={"50px"}/>}
                {props.avatar && <Avatar className={classes["post-avatar"]} src={props.avatar} alt="" width={"50px"}/>}
                <div><p className={classes["details"]}>{`${props.fname} ${props.lname} (${props.nname})`}</p></div>
            </div>
            <div>{props.createdat}</div>
        <div className={classes.content}>{props.message}</div>
        {props.image && <div><img src={props.image} alt="" width={"100px"}/></div>}
        <div className={classes.comments} onClick={showCommentsHandler}>Comments</div>
        {showComments && 
            <>
            {/* <AllComments comments={commentData}/> */}
            <AllComments comments={commentData}/>
            <CreateComment onCreateComment={createCommentHandler}/> 
            </>
        }
        
    </Card>

      
    // </div>
}

export default Post