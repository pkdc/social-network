
import classes from './AllCommentsForEachPost.module.css'
import Comment from './Comment';

function AllComments(props) {
   
    console.log("postToCommentArr in All comments", props.postToCommentArr)

        // thisPostComments = props.postToCommentArr.map((comment) => (
        //     if (!comment.postId) thisPostComments = <h2>Be the first to comment</h2>;
        //     comment.postId === i && 
        //     <div className={classes.container}>
        //         <Comment
        //     key={comment.id}
        //     id={comment.id}
        //     postId={comment.postid}
        //     fname={comment.fname}
        //     lname={comment.lname}
        //     avatar={comment.avatar}
        //     nname={comment.nname}
        //     message={comment.message}
        //     createdAt={comment.createdat} 
        //     />
        //     </div>
        //     ))
    

    return (
        props.postToCommentArr.map((pToCElement, c) => {
            const [commentObj] = Object.values(pToCElement);

            if (commentObj.postid === props.postNum) {
                return <Comment
                    key={commentObj.id}
                    id={commentObj.id}
                    postId={commentObj.postid}
                    fname={commentObj.fname}
                    lname={commentObj.lname}
                    avatar={commentObj.avatar}
                    nname={commentObj.nname}
                    message={commentObj.message}
                    createdAt={commentObj.createdat} 
                />
            }
        })
    );
    
  

    
    
    ;
}

export default AllComments;