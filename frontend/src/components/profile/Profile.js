import { useParams } from "react-router-dom";
import useGet from "../fetch/useGet";
import Card from "../UI/Card";
import GreyButton from "../UI/GreyButton";
import SmallButton from "../UI/SmallButton";
import ToggleSwitch from "../UI/ToggleSwitch";

import classes from './Profile.module.css';

function Profile({userId}) {

    // const currUserId = localStorage.getItem("user_id");
    // console.log("current user", currUserId);

    // const { data } = useGet(`/user?id=${userId}`)

    // const params = useParams();
    let toggleSwitch;
    // if currUserId === userId {
      // or
    // if (currUserId === params.userid) {
        toggleSwitch = <ToggleSwitch label="Private"></ToggleSwitch>;
    // }
    let followButton;
    let messageButton;
    // if (currUserId !== params.userid) {
        // followButton =  <SmallButton>+ Follow</SmallButton>
        // messageButton = <GreyButton>Message</GreyButton> 
// }

    return     <div className={classes.container}>
    <div className={classes.private}>
        {/* label?? friends only/public/private?? */}
    {toggleSwitch}
</div>
    <Card> 
    <div className={classes.wrapper}>
        <div className={classes.img}></div>
         <div className={classes.column}>
            <div className={classes.row}>
                <div className={classes.username}>Username</div> 
                <div className={classes.btn}>
                  {followButton}
                  {messageButton}
                </div>
            </div>
            
            <div className={classes.followers}>
                <div><span className={classes.count}>10k</span> followers</div>
                <div><span className={classes.count}>200</span> following</div>
            </div>
        </div>
        <div>
        </div>
    </div>
    </Card>
    </div>

}


export default Profile;





//Left_panel
// function Profile() {

//     return <Card className={classes.container}> 

//             <div className={classes.img}></div>
//         <div className={classes.wrapper}>

//         <div className={classes.username}>@username</div>
//         <div className={classes.followers}>
//             <div className={classes.follow}><span className={classes.count}>10k</span> followers</div>
//             <div className={classes.follow}><span className={classes.count}>200</span> following</div>
//         </div>
//         </div>
 


//         {/* <div> */}
//         <SmallButton>+ Follow</SmallButton>
//         {/* <SmallButton>+ Message</SmallButton> */}
//         {/* </div> */}
      

//     </Card>

// }


// export default Profile;