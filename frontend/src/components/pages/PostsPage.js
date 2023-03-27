import React, { useEffect, useState } from "react";
import FormLabel from "../UI/FormLabel";
import FormInput from "../UI/FormInput";
import FormTextarea from "../UI/FormTextarea";
// import styles from "./PostsPage.module.css";
import styles from './layout.module.css';
import CreatePost from "../posts/CreatePost";
import AllPosts from "../posts/AllPosts";
import AllEvents from "../group/AllEvents";
import FollowRequest from "../requests/FollowRequest";
import Card from "../UI/Card";
import GroupRequest from "../requests/GroupRequests";
import useGet from "../fetch/useGet";

// const EVENTS = [
//     {
//         id: 1,
//         title: 'title1',
//         desc: 'this is the description',
//         date: '2 MARCH'
// },
// {
//     id: 2,
//     title: 'title2',
//     desc: 'this is the description2',
//     date: '5 MAY'
// }
// ]

const PostsPage = () => {
    const sessionUrl = "http://localhost:8080/session";
    const postUrl = "http://localhost:8080/post";
    const postCommentUrl = "http://localhost:8080/post-comment";

    const [postData, setPostData] = useState([]);
    const [commentData, setCommentData] = useState([]);

    // useGet(sessionUrl);

    // useEffect(() => {
    //     // const reqOptions = {
    //     //     method: "GET",
    //     //     credentials: "include",
    //     //     mode: "cors",
    //     //     headers: {
    //     //         'Content-Type': 'application/json'
    //     //     }
    //     // };
    //     // fetch(sessionUrl, reqOptions)
    //     fetch(sessionUrl)
    //     .then(resp => {
    //         console.log("session resp: ", resp)
    //         return resp.json();
    //     })
    //     .then(data => {
    //         console.log("session resp: ", data)
    //     })
    //     .catch(
    //         err => console.log(err)
    //     );
    // }, []);

    // get posts
    useEffect(() => {
        fetch(postUrl)
        .then(resp => {
            return resp.json();
        })
        .then(data => {
            console.log("post data: ", data)
            const sortedData = data.sort((a, b) => a.createdat > b.createat);
            console.log("sorted post data: ", sortedData);
            setPostData(sortedData);
        })
        .catch(
            err => console.log(err)
        );
    }, []);

    // get comments
    useEffect(() => {
        fetch(postCommentUrl)
        .then(resp => resp.json())
        .then(data => {
            console.log("post page raw comment data: ", data)
            const sortedData = data.sort((a, b) => a.createat > b.createat);
            console.log("post page sorted comment data: ", data)
            setCommentData(sortedData);
        })
        .catch(
            err => console.log(err)
        );
    }, []);
    console.log("post page commentData", commentData);

    // create post
    const createPostHandler = (createPostPayloadObj) => {
        console.log("postpage create post", createPostPayloadObj);
        const reqOptions = {
            method: "POST",
            body: JSON.stringify(createPostPayloadObj)
        };
        fetch(postUrl, reqOptions)
        .then(resp => resp.json())
        .then(data => {
            console.log("post success", data.success);
            // if (data) {
            //     // render all posts
                
            // // navigate("/", {replace: true});
            // }
        })
        .catch(err => {
            console.log(err);
        })
    };

    return ( <div className={styles.container}>
        
        {/* <h1 className={styles["title"]}>Create New Post</h1> */}
       
    
            <div className={styles.mid}>
                <CreatePost onCreatePost={createPostHandler}/>
                <AllPosts posts={postData} comments={commentData}/>
            </div>

            <div className={styles.right}>
                <Card className={styles.requests}>
                    <div className={styles.label}>Follow Requests</div>
                    <FollowRequest></FollowRequest>
                    <FollowRequest></FollowRequest>
                </Card>
                <Card className={styles.requests}>
                    <div className={styles.label}>Group Requests</div>
                    <GroupRequest></GroupRequest>
                    <GroupRequest></GroupRequest>

                </Card>
           </div>
         
        </div>
    )
};

export default PostsPage;