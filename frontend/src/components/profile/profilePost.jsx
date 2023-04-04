import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import classes from './profilePost.module.css'
// import profile from '../assets/profile.svg';
// import AllComments from "./comments/AllComments";
// import CreateComment from './comments/CreateComment';
import Avatar from '../UI/Avatar';
import Card from '../UI/Card';
import useGet from '../fetch/useGet';
// import AllComments from './comments/AllComments';


function ProfilePosts() {

    const { error, isLoaded, data } = useGet("/post");
    console.log("profile posts", data);
   
    if (!isLoaded) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    // const [showComments, setShowComments] = useState(false);

    // console.log("comment for post: ", props.postNum, " comments: ", props.commentsForThisPost)

    const defaultImagePath = "default_avatar.jpg";
    // const postCommentUrl = "http://localhost :8080/post-comment";

    // return <div className={classes.container}>
    // const showCommentsHandler = () => {
    //     // console.log(showComments);
    //     !showComments && setShowComments(true);
    //     showComments && setShowComments(false);
    // };

    // const createCommentHandler = (createCommentPayloadObj) => {
    //     console.log("create comment for Post", createCommentPayloadObj)
        
    //     const reqOptions = {
    //         method: "POST",
    //         body: JSON.stringify(createCommentPayloadObj),
    //     }
    //     fetch(postCommentUrl, reqOptions)
    //     .then(resp => resp.json())
    //     .then(data => {
    //         console.log("create comment success", data.success);
    //         props.onCreateCommentSuccessful(data.success); // lift it up to PostPage
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // };

    // useEffect(() => {
    //     fetch(postCommentUrl)
    //     .then(resp => resp.json())
    //     .then(data => {
    //         // console.log("raw comment data: ", data)

    //         // construct an array of objs
    //         // the objs are postid-commentid(key) to comment(value)
    //         let postToCommentTempArray = [];
            
    //         for (let p = 1; p <= props.totalNumPost; p++) {
    //             // console.log("post num: ", p)
    //             for (let c = 0; c < data.length; c++) {
    //                 if (data[c].postid === p) {
    //                     let pToC = {};
    //                     pToC[`p${data[c].postid}-c${data[c].id}`] = data[c];
    //                     postToCommentTempArray.push(pToC);
    //                 }
    //             }
    //         }

    //     })
    //     .catch(
    //         err => console.log(err)
    //     );
    // }, []);

    // showComments && console.log("comment data(outside): ", commentData)
    // showComments && console.log("commentsForEachPostsArr (outside): ", postToCommentArray)


    return <>
    {data && data.map((post) => (
    <Card className={classes.container} >
    
        {console.log("map", post)}
     <div className={classes["author"]}>
      
     <div>
         {!post.avatar && <Avatar className={classes["post-avatar"]} src={require("../../images/"+`${defaultImagePath}`)} alt="" width={"50px"}/>}
         {post.avatar && <Avatar className={classes["post-avatar"]} src={post.avatar} alt="" width={"50px"}/>}
     </div>
     <Link to={`/profile/${post.authorId}`}>
         <div><p className={classes["details"]}>{`${post.fname} ${post.lname} ${post.nname}`}</p></div>
     </Link>
 </div>
 <div className={classes["create-at"]}>{post.createdat.split(".")[0]}</div>
 <div className={classes.content}>{post.message}</div>
 {post.image && <div><img src={post.image} alt="" width={"100px"}/></div>}
 {/* <div className={classes.comments} onClick={showCommentsHandler}>{post.commentsForThisPost.length} Comments</div> */}
 {/* {showComments && 
     <>
         <AllComments comments={post.commentsForThisPost}/>
         <CreateComment pid={post.id} onCreateComment={createCommentHandler}/> 
     </>
 } */}
 
    </Card>
        ))}
   </>
}

export default ProfilePosts