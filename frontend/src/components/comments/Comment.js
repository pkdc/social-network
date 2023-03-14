
import classes from './Comment.module.css'

import profile from '../assets/profile.svg'
    

function Comment(props) {
    return <div className={classes.comment}>
    <img src={profile} alt='' />
    <div>
        <div className={classes.username}>{props.user}Username</div>
        <div className={classes.content}>{props.comment}lorep ipsum hfdshjksdhjkvhjkjkvhjf</div>
    </div>
      
    </div>
}

export default Comment;