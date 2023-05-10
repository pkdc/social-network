import Post from "./GroupPost";

import classes from './AllGroupPosts.module.css'
import GroupPost from "./GroupPost";
import useGet from "../fetch/useGet";

function AllGroupPosts({ groupid }) {
    console.log("all group post id", groupid)

    const { error, isLoaded, data } = useGet(`/group-post?groupid=${groupid}`)
    console.log("all group posts data", data)

    // var myDate = new Date(data.data[0].createdat);
    // var mills = myDate.getTime();
    // const newDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: '2-digit',  hour: 'numeric',
    // minute: 'numeric',}).format(mills);

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
