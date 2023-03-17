import classes from './GroupProfile.module.css';
import SmallButton from "../UI/SmallButton";
import GreyButton from "../UI/GreyButton";
import Card from "../UI/Card";

function GroupProfile() {
    return <Card className={classes.container}>
        <div className={classes.img}></div>
        <div className={classes.wrapper}>
            <div className={classes.row}>
                <div className={classes.groupname}>Group Name</div>
                <div className={classes.btnWrapper}>
                    <SmallButton className={classes.btn}>+ Invite</SmallButton>
                    <GreyButton className={classes.btn}>Message</GreyButton>
                </div>
            </div>
         
            <div className={classes.description}>description</div>
            {/* <div className={classes.members}>Members</div> */}
      
            
        </div>
       

    </Card>
}

export default GroupProfile;