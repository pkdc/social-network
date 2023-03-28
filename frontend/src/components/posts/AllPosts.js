import Post from "./Post";

import classes from './AllPosts.module.css'
import useGet from "../fetch/useGet";
import { useEffect } from "react";

function AllPosts(props) {

    //props.userId

    // const { data } = useGet(`/posts`)
    // console.log("out", props.comments);
    let eachPostCommentsArr = [];

    for (let i = 0; i < props.posts.length; i++) {
        let thisPostComments = [];
        for (let j = 0; j < props.comments.length; j++) {
            props.comments[j] && props.comments[j].postid === props.posts[i].id && thisPostComments.push(props.comments[j]);
        }
        eachPostCommentsArr.push(thisPostComments);        
    }
    console.log("eachPostComments", eachPostCommentsArr);

    // useEffect(() => {
        // for (let i = 0; i < props.posts.length; i++) {
        //     console.log("loop", props.comments[i]);
        //     // the comment is for post i
        //     // props.comments[i].postid === i && thisPostComments.push(props.comments[i])
        // }
    // },[props.posts.length, props.comments]);
    
    

    return <div className={classes.container}>
        {props.posts.map((post, p) => (
            
         <Post
            key={post.id}
            id={post.id}
            avatar={post.avatar}
            fname={post.fname}
            lname={post.lname}
            nname={post.nname}
            message={post.message}
            image={post.image}
            createdat={post.createdat}
            authorId={post.author}
            // totalNumPost={props.posts.length}
            postNum={p}
            commentsForThisPost={eachPostCommentsArr[p]}
        />
        ))}
    </div>
}

export default AllPosts;