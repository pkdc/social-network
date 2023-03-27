import Post from "./Post";

import classes from './AllPosts.module.css'
import useGet from "../fetch/useGet";

function AllPosts(props) {

    //props.userId

    // const { data } = useGet(`/posts`)

    return <div className={classes.container}>
        {props.posts.map((post, i) => (
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
        totalNumPost={props.posts.length}
        postNum={i}
        />
        ))}
    </div>
}

export default AllPosts;