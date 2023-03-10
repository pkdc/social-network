import classes from './post.module.css'
import profile from '../assets/profile.svg';
import Card from '../UI/Card';
import AllComments from './comments/AllComments';
import { useState } from 'react';

function Post(props) {

            return <Card className={classes.container} >
          <div className={classes.user}>
            <img src={profile} alt='' />
            <div>
                <div className={classes.username}>{props.user}</div>
                <div>{props.date}</div>
            </div>
          
        </div>
        <div className={classes.content}>{props.content}</div>
        <div className={classes.comments}>
           <button className={classes.btn}>comments</button>
            </div>

    <AllComments></AllComments>
       
    </Card>

}

export default Post