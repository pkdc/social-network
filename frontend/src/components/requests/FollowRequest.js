import classes from './FollowRequest.module.css';
import profile from '../assets/profile.svg';
import Card from '../UI/Card';
import SmallButton from '../UI/SmallButton';
import GreyButton from '../UI/GreyButton';

function FollowRequest() {

    return<div className={classes.container}>
        <div className={classes.wrapper}>
            <img className={classes.img} src={profile}/>
            <div className={classes.user}>username</div>
        </div>
    
        <div>
            <SmallButton className={classes.btn}>Confirm</SmallButton>
        </div>
    </div>
}

export default FollowRequest;