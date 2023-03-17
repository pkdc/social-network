import classes from './GroupPost.module.css'
import profile from '../assets/profile.svg';
import Card from '../UI/Card';

function GroupPost(props) {
    // return <div className={classes.container}>  
    return <Card className={classes.container} >
          <div className={classes.user}>
            <img src={profile} alt='' />
            <div>
                <div className={classes.username}>{props.user}</div>
                <div>{props.date}</div>
            </div>
          
        </div>
        <div className={classes.content}>{props.content}</div>
        <div className={classes.comments}>comments</div>
    </Card>

      
    // </div>
}

export default GroupPost