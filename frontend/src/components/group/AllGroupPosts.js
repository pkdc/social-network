

import classes from './AllGroupPosts.module.css'
import useGet from "../fetch/useGet";
import { useEffect, useState } from "react";
import CreateGroupPost from "./CreateGroupPost";
import GroupPost from "./GroupPost";


function AllGroupPosts(props) {


    const { error, isLoaded, data } = useGet(`/group-post?groupid=${props.groupid}`)
    console.log("all group posts data", data.data)

    if (!isLoaded) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    
    let eachPostCommentsArr = [];
    if (data.data != null) {
        for (let i = 0; i < data.data.length; i++) {
            let thisPostComments = [];
            for (let j = 0; j < props.comments.length; j++) {
                props.comments[j] && props.comments[j].postid === data.data[i].id && thisPostComments.push(props.comments[j]);
            }
            eachPostCommentsArr.push(thisPostComments);
        }
        

    }
    const createCommentSuccessHandler = (createCommentSuccessful) => {
        // lift it up to PostPage
        props.onCreateCommentSuccessful(createCommentSuccessful)
    };


    return <div className={classes.container}>
        {data.data && data.data.map((post, p) => (
            <GroupPost
                key={post.id}
                id={post.id}
                avatar={post.avatar}
                author={post.author}
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
                onCreateCommentSuccessful={createCommentSuccessHandler}
            />
        ))}
    </div>
}

export default AllGroupPosts;







// import Post from "./GroupPost";

// import classes from './AllGroupPosts.module.css'
// import GroupPost from "./GroupPost";
// import useGet from "../fetch/useGet";

// function AllGroupPosts({ groupid }) {
//     console.log("all group post id", groupid)

//     const { error, isLoaded, data } = useGet(`/group-post?groupid=${groupid}`)
//     console.log("all group posts data", data)

//     // var myDate = new Date(data.data[0].createdat);
//     // var mills = myDate.getTime();
//     // const newDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: '2-digit',  hour: 'numeric',
//     // minute: 'numeric',}).format(mills);

//     if (!isLoaded) return <div>Loading...</div>
//     if (error) return <div>Error: {error.message}</div>

//     return <div className={classes.container}>
//         {data.data && data.data.map((post) => (
//          <GroupPost
//         key={post.id}
//         id={post.id}
//         author={post.author}
//         message={post.message}
//         image={post.image}
//         createdat={post.createdat} 
//         />
//         ))}
//     </div>
// }

// export default AllGroupPosts;
