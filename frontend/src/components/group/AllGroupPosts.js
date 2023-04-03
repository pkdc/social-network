import Post from "./GroupPost";

import classes from './AllGroupPosts.module.css'
import GroupPost from "./GroupPost";
import useGet from "../fetch/useGet";

function AllGroupPosts(props) {

    const { error, isLoaded, data } = useGet(`/group-post?groupid=${props.groupid}`)

    if (!isLoaded) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return <div className={classes.container}>
        {data.data && data.data.map((post) => (
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