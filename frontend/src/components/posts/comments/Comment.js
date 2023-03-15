
import classes from './Comment.module.css'

// import profile from '../../assets/profile.svg'
import Avatar from '../../UI/Avatar';
    

function Comment(props) {
    return <div className={classes.comment}>
    <Avatar src={props.avatar}/>
    <div>
        <div className={classes.username}>{props.user}Username</div>
        <div className={classes.content}>{props.comment}lorep ipsum hfdshjksdhjkvhjkjkvhjf</div>
    </div>
      
    </div>
}

export default Comment;