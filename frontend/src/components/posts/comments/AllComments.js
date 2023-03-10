
import classes from './AllComments.module.css'
import CreateComment from './CreateComment';
import Comment from './Comment';

function AllComments(props) {



    return  <div className={classes.container}>

    <CreateComment></CreateComment>

    {/* {props.comments.map((comment) => (
         <Comment
        key={comment.id}
        id={comment.id}
        user={comment.user}
        comment={comment.comment}
        date={comment.date} 
        />
        ))} */}
        <Comment></Comment>


    </div>
}

export default AllComments;