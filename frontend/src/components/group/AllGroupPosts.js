import Post from "./GroupPost";

function AllPosts(props) {
    return <div>
        {props.posts.map((post) => (
         <Post
        key={post.id}
        id={post.id}
        user={post.user}
        content={post.content}
        date={post.date} 
        />
        ))}
    </div>
}

export default AllPosts;