import React, { useEffect, useState } from "react";
import FormLabel from "../UI/FormLabel";
import FormInput from "../UI/FormInput";
import FormTextarea from "../UI/FormTextarea";
import styles from "./PostsPage.module.css";
import CreatePost from "../posts/CreatePost";
import AllPosts from "../posts/AllPosts";

const PostsPage = () => {
    const postUrl = "http://localhost:8080/post/";

    const [postData, setPostData] = useState([]);
    // const DATA = [
    //     {
    //         id: 1,
    //         user: 'username',
    //         content: 'this is the post content',
    //         date: 'date'
    // },
    // {
    //     id: 2,
    //     user: 'username2',
    //     content: 'this is the post content2',
    //     date: 'date2'
    // }
    // ]

    useEffect(() => {
        fetch(postUrl)
        .then(resp => {
            return resp.json();
        })
        .then(data => {
            setPostData(data);
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
            console.log(data);
            if (data) {
                // render all posts
                
            // navigate("/", {replace: true});
            }
        })
        .catch(err => {
            console.log(err);
        })

    };

    return (
        <>
        <h1 className={styles["title"]}>Create New Post</h1>
        <div className={styles["container"]}>
            <div className={styles["create-post"]}>
                <CreatePost onCreatePost={createPostHandler}/>
            </div>
            <div className={styles["all-posts"]}>
                <AllPosts posts={postData}/>
            </div>
        </div>
        </>
    )
};

export default PostsPage;