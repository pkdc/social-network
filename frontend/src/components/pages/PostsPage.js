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


const PostsPage = () => {
    const postUrl = "http://localhost:8080/post";

    const [postData, setPostData] = useState([]);

    useEffect(() => {
        fetch(postUrl)
        .then(resp => {
            return resp.json();
        })
        .then(data => {
            // console.log("post data: ", data)
            const sortedData = data.sort((a, b) => a.createdat > b.createat);
            // console.log("sorted post data: ", sortedData);
            setPostData(sortedData);
        })
        .catch(
            err => console.log(err)
        );
    }, []);

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
            <AllPosts posts={postData}/>
                
          
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