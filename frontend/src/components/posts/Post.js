import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import classes from './Post.module.css'
// import profile from '../assets/profile.svg';
import AllCommentsForEachPost from "./comments/AllCommentsForEachPost";
import CreateComment from './comments/CreateComment';
import Avatar from '../UI/Avatar';
import Card from '../UI/Card';
import AllComments from './comments/AllComments';


function Post(props) {
    const [showComments, setShowComments] = useState(false);
    // const [commentData, setCommentData] = useState("");
    const [postToCommentArray, setpostToCommentArray] = useState([]);

    const defaultImagePath = "default_avatar.jpg";
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
            console.log("create comment success", data.success);
        })
        .catch(err => {
            console.log(err);
        })

    };

    useEffect(() => {
        fetch(postCommentUrl)
        .then(resp => resp.json())
        .then(data => {
            console.log("raw comment data: ", data)

            // construct an array of objs
            // the objs are postid-commentid(key) to comment(value)
            let postToCommentTempArray = [];
            
            for (let p = 1; p <= props.totalNumPost; p++) {
                console.log("post num: ", p)
                for (let c = 0; c < data.length; c++) {
                    if (data[c].postid === p) {
                        let pToC = {};
                        pToC[`p${data[c].postid}-c${data[c].id}`] = data[c];
                        postToCommentTempArray.push(pToC);
                    }
                }
            }
            console.log("posts to comments arr: ", postToCommentTempArray)
            // setCommentData(data);
            setpostToCommentArray(postToCommentTempArray);
        })
        .catch(
            err => console.log(err)
        );
    }, []);

    // showComments && console.log("comment data(outside): ", commentData)
    showComments && console.log("commentsForEachPostsArr (outside): ", postToCommentArray)


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
        <div className={classes["create-at"]}>{props.createdat}</div>
        <div className={classes.content}>{props.message}</div>
        {props.image && <div><img src={props.image} alt="" width={"100px"}/></div>}
        <div className={classes.comments} onClick={showCommentsHandler}>Comments</div>
        {showComments && 
            <>
            <AllCommentsForEachPost postNum={props.postNum} postToCommentArr={postToCommentArray}/>
            <CreateComment pid={props.id} onCreateComment={createCommentHandler}/> 
            </>
        }
        
    </Card>

      
    // </div>
}

export default Post