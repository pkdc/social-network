import { useEffect, useState, useContext } from "react";
import useGet from "../fetch/useGet";
import Post from "../posts/Post";
import Card from "../UI/Card";
import GreyButton from "../UI/GreyButton";
import SmallButton from "../UI/SmallButton";
import ToggleSwitch from "../UI/ToggleSwitch";
import { FollowingContext } from "../store/following-context";
import { UsersContext } from "../store/users-context";
import { WebSocketContext } from "../store/websocket-context";
import classes from './Profile.module.css';

function Profile({ userId }) {
    // get stored publicity from localStorage
    // let selfPublicStatus;
    // selfPublicNum === 0 ? selfPublicStatus = false : selfPublicStatus = true;

    // self
    const [publicity, setPublicity] = useState(false); // 0, false is private, 1, true is public
    const selfPublicNum = +localStorage.getItem("public");
    console.log("stored publicity (profile)", selfPublicNum);
    useEffect(() => {
        selfPublicNum ? setPublicity(true) : setPublicity(false);
    }, [selfPublicNum]);

    // friend
    const followingCtx = useContext(FollowingContext);
    const usersCtx = useContext(UsersContext);
    const wsCtx = useContext(WebSocketContext);

    const currUserId = localStorage.getItem("user_id");
    const [currentlyFollowing, setCurrentlyFollowing] = useState(false);
    const [requestedToFollow, setRequestedToFollow] = useState(false);

    useEffect(() => {
        const storedFollowing = JSON.parse(localStorage.getItem("following"));
        console.log("stored following (profile)", storedFollowing);
        followingCtx.following && setCurrentlyFollowing(followingCtx.following.some(followingUser => followingUser.id === +userId))
    }, [followingCtx.following, userId]);
    
    useEffect(() => {
        if (wsCtx.newNotiReplyObj) {
            if (wsCtx.newNotiReplyObj.accepted) {
                setCurrentlyFollowing(true);
                setRequestedToFollow(false);

                const followUser = usersCtx.users.find(user => user.id === wsCtx.newNotiReplyObj.sourceid);
                console.log("found user frd (profile accepted req)", followUser);
                followingCtx.follow(followUser);

                console.log("follow user id", wsCtx.newNotiReplyObj.sourceid);
                console.log("cur user is following (profile)", followingCtx.following);
                const targetId =  wsCtx.newNotiReplyObj.sourceid;
                console.log("targetid", targetId)
                console.log("current user", currUserId)
    
                storeFollow(targetId);
            } else {
                setCurrentlyFollowing(false);
                setRequestedToFollow(false);
            }
        }
        wsCtx.setNewNotiReplyObj(null);
    } , [wsCtx.newNotiReplyObj]);

    const followHandler = (e) => {
        const followUser = usersCtx.users.find(user => user.id === +e.target.id);
        console.log("found user frd (profile)", followUser);
        console.log("frd publicity", publicity);
        if (followUser) {
            if (followUser.public) {
                console.log(" user frd (public)");
                followingCtx.follow(followUser);
                setCurrentlyFollowing(true);
                storeFollow(e.target.id);
            } else if (!followUser.public) { //if frd private
                console.log(" user frd (private)");
                followingCtx.requestToFollow(followUser);
                setRequestedToFollow(true);
            }
        } else {
            console.log("user frd not found (profile)");
        }
    };

    const unfollowHandler = (e) => {
        console.log("unfollow userid", e.target.id);
        const unfollowUser = usersCtx.users.find(user => user.id === +e.target.id);
        console.log("unfollow user", unfollowUser);
        unfollowUser && followingCtx.unfollow(unfollowUser);
        setCurrentlyFollowing(false);

        // delete from db
        
    };

    const setPublicityHandler = (e) => {
        console.log("publicity", publicity);
        console.log("toggle event", e);
        console.log("toggle prev checkbox status", e.target.defaultChecked);
        console.log("toggle cur checkbox status", e.target.checked);
        // e.target.defaultChecked && setPublicity(false); // wrong but css working
        // e.target.checked && setPublicity(true); // wrong but css working
        // setPublicity((prev) => (
        //     prev = !prev
        //     // !prev ? setPublicity(true) : setPublicity(false) // also doesn't work correctly
        // ));
        setPublicity(prev => !prev); // right but css not working

        let publicityNum;
        publicity ? publicityNum = 1 : publicityNum = 0;
        localStorage.setItem("public", publicityNum);

        // post to store publicity to db

    };

    // frd
    
    let followButton;
    let messageButton;
    
    if (currUserId !== userId) {
        console.log("currentlyFollowing", currentlyFollowing);
        if (currentlyFollowing) {
            followButton = <div className={classes.followbtn} id={userId} onClick={unfollowHandler}>- UnFollow</div>
        } else if (requestedToFollow) {
            followButton = <div className={classes.followbtn} id={userId}>Requested</div>
        } else {
            followButton = <div className={classes.followbtn} id={userId} onClick={followHandler}>+ Follow</div>
        }       
        messageButton = <GreyButton>Message</GreyButton> 
    }
    // get userId (self) data
    const { error , isLoaded, data } = useGet(`/user?id=${userId}`)
     console.log("user data (profile)", data.data)

      if (!isLoaded) return <div>Loading...</div>
      if (error) return <div>Error: {error.message}</div>

    // store in db
    const storeFollow = (targetId) => {
        console.log("targetid (storeFollow)", targetId)

        const data = {
            // id: 0,
            sourceid: parseInt(currUserId),
            targetid: parseInt(targetId),
            status: 1
        };

        const reqOptions = {
            method: "POST",
            credentials: "include",
            mode: "cors",
            headers: {
              'Content-Type': 'application/json'
          },
            body: JSON.stringify(data)
          };
        
          fetch('http://localhost:8080/user-follower', reqOptions)
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
    };

    return <div className={classes.container}>
    <div className={classes.private}>
        {/* label?? friends only/public/private?? */}
        {currUserId === userId && !publicity && 
            <ToggleSwitch
                label={"Private"}
                value={"Private"}
                // onClick={setPublicChangeHandler}
                // onChange={setPublicChangeHandler}
                onChange={setPublicityHandler}
            ></ToggleSwitch>}
        {currUserId === userId && publicity && 
            <ToggleSwitch 
                label={"Public"}
                value={"Public"}
                // onClick={setPrivateChangeHandler}
                // onChange={setPrivateChangeHandler}
                onChange={setPublicityHandler}
            ></ToggleSwitch>}            
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