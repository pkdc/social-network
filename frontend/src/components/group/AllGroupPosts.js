import Post from "./GroupPost";

import classes from './AllGroupPosts.module.css'
import GroupPost from "./GroupPost";
import useGet from "../fetch/useGet";

function AllGroupPosts(props) {

    const { data } = useGet("/group-posts")

    return <div className={classes.container}>
        {data.map((post) => (
         <GroupPost
        key={post.id}
        id={post.id}
        author={post.author}
        message={post.message}
        image={post.image}
        createdat={post.createdat} 
        />
        ))}
    </div>
}

export default AllGroupPosts;