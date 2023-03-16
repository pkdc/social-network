import Post from "./Post";

function AllPosts(props) {
    return <div>
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