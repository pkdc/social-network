import React from "react";
import FormLabel from "../UI/FormLabel";
import FormInput from "../UI/FormInput";
import FormTextarea from "../UI/FormTextarea";
import styles from "./PostsPage.module.css";
import CreatePost from "../posts/CreatePost";
import AllPosts from "../posts/AllPosts";

const PostsPage = () => {
    const DATA = [
        {
            id: 1,
            user: 'username',
            content: 'this is the post content',
            date: 'date'
    },
    {
        id: 2,
        user: 'username2',
        content: 'this is the post content2',
        date: 'date2'
    }
    ]

    return (
        <>
        <h1 className={styles["title"]}>Create New Post</h1>
        <div className={styles["container"]}>
            <div className={styles["create-post"]}>
                <CreatePost />
            </div>
            <div className={styles["all-posts"]}>
                <AllPosts posts={DATA}/>
            </div>
        </div>
        </>
    )
};

export default PostsPage;