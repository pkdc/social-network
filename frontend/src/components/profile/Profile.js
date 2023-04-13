import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGet from "../fetch/useGet";
import Post from "../posts/Post";
import Card from "../UI/Card";
import GreyButton from "../UI/GreyButton";
import SmallButton from "../UI/SmallButton";
import ToggleSwitch from "../UI/ToggleSwitch";

import classes from './Profile.module.css';

function Profile({ userId }) {
    const [publicity, setPublicity] = useState(false); // false is public, true is private

    const currUserId = localStorage.getItem("user_id");

    // get userId data
    const { error , isLoaded, data } = useGet(`/user?id=${userId}`)
     console.log("user data", data.data)

      if (!isLoaded) return <div>Loading...</div>
      if (error) return <div>Error: {error.message}</div>

    // follow
    function handleClick(e) {
        const targetId = e.target.id
        console.log("targetid", targetId)
        console.log("current user", currUserId)

        const data = {
            id: 0,
            sourceid: parseInt(currUserId),
            targetid: parseInt(targetId),
            status: 1
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
                    console.log("followrequest")
                }
            })
            .catch(err => {
              console.log(err);
            })
    }
    
    
    let toggleSwitch;
    // self
    if (currUserId === userId) {
        if (publicity) {
            toggleSwitch = <ToggleSwitch label="Public"></ToggleSwitch>;         
        } else {
            toggleSwitch = <ToggleSwitch label="Private"></ToggleSwitch>;
        }
    }
    
    let followButton;
    let messageButton;
    if (currUserId !== userId) {
        followButton =  <div className={classes.followbtn} id={userId} onClick={handleClick}>+ Follow</div>
        messageButton = <GreyButton>Message</GreyButton> 
}

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
                   <div className={classes.name}>{data.data[0].fname} {data.data[0].lname}</div>
                   <div className={classes.btn}>
                     {followButton}
                     {messageButton}
                   </div>
               </div>
           
               <div className={classes.username}>{data.data[0].nname}</div> 
               <div className={classes.followers}>
                   {/* <div><span className={classes.count}>10k</span> followers</div>
                   <div><span className={classes.count}>200</span> following</div> */}
               </div>
               <div>{data.data[0].about}</div>
           </div>
           <div>
           </div>
       </div>



    </Card>
    {/* })} */}
    
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