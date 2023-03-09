import classes from './GroupProfile.module.css';
import SmallButton from "../UI/SmallButton";

function GroupProfile() {
    return <div className={classes.container}>
        <div className={classes.img}></div>
        <div className={classes.wrapper}>
            <div className={classes.groupname}>Group Name</div>
            <div className={classes.description}>description</div>
            <div className={classes.btn}>
                <SmallButton>Invite</SmallButton>
            </div>
            
        </div>
       

    </div>
}

export default GroupProfile;