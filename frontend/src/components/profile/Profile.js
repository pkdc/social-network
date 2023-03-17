import Card from "../UI/Card";
import GreyButton from "../UI/GreyButton";
import SmallButton from "../UI/SmallButton";
import ToggleSwitch from "../UI/ToggleSwitch";

import classes from './Profile.module.css';

function Profile() {

    return     <div className={classes.container}>
    <div className={classes.private}>
        {/* label?? friends only/public/private?? */}
    <ToggleSwitch label="Private"></ToggleSwitch>
</div>
    <Card> 
    <div className={classes.wrapper}>
        <div className={classes.img}></div>
         <div className={classes.column}>
            <div className={classes.row}>
                <div className={classes.username}>@username</div> 
                <div className={classes.btn}>
                    {/* <SmallButton>+ Follow</SmallButton>
                    <GreyButton>Message</GreyButton> */}
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