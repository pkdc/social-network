import Post from "./GroupPost";

import classes from './AllGroupPosts.module.css'
import GroupPost from "./GroupPost";
import useGet from "../fetch/useGet";

function AllGroupPosts(props) {

    const { data } = useGet("/groupposts")
    console.log(data)

    return <div className={classes.container}>
        {data.map((post) => (
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