import Post from "./Post";

import classes from './AllPosts.module.css'
import useGet from "../fetch/useGet";

function AllPosts(props) {

    const userId = props.userId
    console.log("user id posts", userId)

    const { data } = useGet(`/post?id=${userId}`)

    return <div className={classes.container}>
        {data.map((post) => (
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
        // postNum={i}
        />
        ))}
    </div>
}

export default AllPosts;