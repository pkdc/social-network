import Post from "./GroupPost";

import classes from './AllGroupPosts.module.css'
import GroupPost from "./GroupPost";

function AllGroupPosts(props) {
    return <div className={classes.container}>
        {props.posts.map((post) => (
         <GroupPost
        key={post.id}
        id={post.id}
        user={post.user}
        content={post.content}
        date={post.date} 
        />
        ))}
    </div>
}

export default AllGroupPosts;