import classes from './GroupProfile.module.css';
import SmallButton from "../UI/SmallButton";
import GreyButton from "../UI/GreyButton";
import Card from "../UI/Card";
import useGet from '../fetch/useGet';
import { useLocation } from 'react-router-dom';

function GroupProfile( {groupId} ) {
    const currUserId = localStorage.getItem("user_id");
    console.log("current user", currUserId);

    function clickHandler() {
        const currUserId = localStorage.getItem("user_id");
        console.log("current user", currUserId);
    
    }
    
//    const { data } = useGet(`/group?id=${groupId}`)

    return <Card className={classes.container}>
        <div className={classes.img}></div>
        <div className={classes.wrapper}>
            <div className={classes.row}>
                <div className={classes.groupname}>Group Name</div>
                <div className={classes.btnWrapper}>
                    <SmallButton className={classes.btn} onClick={clickHandler}>+ Invite</SmallButton>
                    <GreyButton className={classes.btn}>Message</GreyButton>
                </div>
            </div>
         
            <div className={classes.description}>description</div>
            {/* <div className={classes.members}>Members</div> */}
      
            
        </div>
       

    </Card>
}

export default GroupProfile;