
import classes from './AllComments.module.css'
import Comment from './Comment';

function AllComments(props) {
   
    console.log("postToCommentArr in All comments", props.postToCommentArr)
        // let thisPostComments;

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
    

    return <Comment />
    
  

    
    
    ;
}

export default AllComments;