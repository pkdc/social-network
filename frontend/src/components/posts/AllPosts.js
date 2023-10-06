import Post from "./Post";
import classes from "./AllPosts.module.css";
import useGet from "../fetch/useGet";
import { useCallback, useEffect, useState } from "react";

function AllPosts(props) {
	//props.userId

	// const { data } = useGet(`/posts`)
	// console.log("out", props.comments);
	const [posts, setPosts] = useState([]);
	let eachPostCommentsArr = [];

	useEffect(() => setPosts(props.posts), [props.posts]);

	if (posts)
		for (let i = 0; i < posts.length; i++) {
			let thisPostComments = [];
			for (let j = 0; j < props.comments.length; j++) {
				props.comments[j] &&
					props.comments[j].postid === posts[i].id &&
					thisPostComments.push(props.comments[j]);
			}
			eachPostCommentsArr.push(thisPostComments);
		}
	// console.log("eachPostComments", eachPostCommentsArr);

	const createCommentSuccessHandler = useCallback(
		(createCommentSuccessful) => {
			// lift it up to PostPage
			props.onCreateCommentSuccessful(createCommentSuccessful);
		},
		[props.onCreateCommentSuccessful]
	);

	return (
		<>
			{!props.posts && !posts ? (
				<h3>No Posts Yet...</h3>
			) : (
				<div className={classes.container}>
					{posts.map((post, p) => (
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
							privacy={post.privacy}
							// totalNumPost={props.posts.length}
							postNum={p}
							commentsForThisPost={eachPostCommentsArr[p]}
							onCreateCommentSuccessful={createCommentSuccessHandler}
						/>
					))}
				</div>
			)}
		</>
	);
}

export default AllPosts;
