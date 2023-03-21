import classes from './GroupPost.module.css'
import profile from '../assets/profile.svg';
import Card from '../UI/Card';

function GroupPost(props) {

    return <Card className={classes.container} >
          <div className={classes.user}>
            <img src={profile} alt='' />
            <div>
                <div className={classes.username}>{props.author}</div>
                <div className={classes.date}>{props.createdat}</div>
            </div>
          
        </div>
        <div className={classes.content}>{props.message}</div>
        <div className={classes.comments}>comments</div>
    </Card>

      
    // </div>
}

export default GroupPost