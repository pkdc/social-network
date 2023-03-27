import { useParams } from "react-router-dom";
import useGet from "../fetch/useGet";
import Card from "../UI/Card";
import GreyButton from "../UI/GreyButton";
import SmallButton from "../UI/SmallButton";
import ToggleSwitch from "../UI/ToggleSwitch";

import classes from './Profile.module.css';

function Profile({userId}) {
    let userData = [];
    let user = [];

    const currUserId = localStorage.getItem("user_id");
    console.log("current user", currUserId);

    const { data } = useGet(`/user?id=${userId}`)

    userData = data
    console.log(userData)
    user = userData.data

    // user = userData[0][0]
    console.log("user info fname", user)


    function handleClick(e) {
        const targetId = e.target.id

        const data = {
            id: 0,
            sourceid: currUserId,
            targetid: targetId,
            status: 0
        };

        const test = {
            method: "POST",
            credentials: "include",
            mode: "cors",
            headers: {
              'Content-Type': 'application/json'
          },
            body: JSON.stringify(data)
          };
        
          fetch('http://localhost:8080/user-follower', test)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    console.log("test")
                }
            })
            .catch(err => {
              console.log(err);
            })
    }
    
    // const params = useParams();
    let toggleSwitch;
    // if (currUserId === userId) {
      // or
    // if (currUserId === params.userid) {
        toggleSwitch = <ToggleSwitch label="Private"></ToggleSwitch>;
    // }
    let followButton;
    let messageButton;
    // if (currUserId !== userId) {
        followButton =  <SmallButton id={userId} onClick={handleClick}>+ Follow</SmallButton>
        messageButton = <GreyButton>Message</GreyButton> 
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
                {/* <div className={classes.name}>{user.fname} {user.lname}</div> */}
                <div className={classes.btn}>
                  {followButton}
                  {messageButton}
                </div>
            </div>
        
            {/* <div className={classes.username}>{user.nname}</div>  */}
            <div className={classes.followers}>
                <div><span className={classes.count}>10k</span> followers</div>
                <div><span className={classes.count}>200</span> following</div>
            </div>
            {/* <div>{user.about}</div> */}
            
           
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