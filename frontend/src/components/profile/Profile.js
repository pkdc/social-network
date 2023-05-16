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
import axios from "axios";
let boolstatus ; 
function Profile({ userId }) {
    
    // get stored publicity from localStorage
    // let selfPublicStatus;
    // selfPublicNum === 0 ? selfPublicStatus = false : selfPublicStatus = true;
let statusofcuruser ;
    // self
    const [publicity, setPublicity] = useState(false); // 1 false is public, 0 true is private
    const selfPublicNum = +localStorage.getItem("public");
    let public1  ; 
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
        deleteFollow(e.target.id);
    };

    const setPublicityHandler = (e) => {
    //     console.log("publicity", publicity);
    //     console.log("toggle event", e);
    //     console.log("toggle prev checkbox status", e.target.defaultChecked);
        console.log("---------------------toggle cur checkbox status", e.target.checked);
        // e.target.defaultChecked && setPublicity(false); // wrong but css working
        if (e.target.checked ){
            setPublicity(true); // private
        }else {
            setPublicity(false);
        }
        
           // wrong but css working
        // setPublicity((prev) => (
        //     prev = !prev
        //     // !prev ? setPublicity(true) : setPublicity(false) // also doesn't work correctly
        // ));
        // setPublicity(prev => !prev); // right but css not working
        let publicityNum;
        if (e.target.checked ){
            publicityNum = 0
        }else {
            publicityNum = 1;
        }
        console.log({publicityNum})
        localStorage.setItem("public", publicityNum);

        // post to store publicity to db

        const data = { 
            // Define the data to send in the request body
            targetid: parseInt(userId),
            public : publicityNum,
        };
        
        fetch('http://localhost:8080/privacy', 
        {
            
            method: 'POST',
            // credentials: "include",
            // mode: 'cors',
            body: JSON.stringify(data),
            // headers: { 
            //     'Content-Type': 'application/json' 
            // }
        }).then(() => {
            // navigate.replace('/??')
            console.log("privacy changed")
        })
    };
    
    let followButton;
    let messageButton;
    useEffect(() => {
        // const fetchData = () => {
    fetch(`http://localhost:8080/user-follow-status?tid=${userId}&sid=${currUserId}`)
    .then(response => response.text())
    .then(data => {
      // Access the boolean value from the response
    //   const value = data.value;
  
      // Use the boolean value in your JavaScript code
      console.log("------data: ",data);
if (data == "true"){
    // console.log("bool false ")
    setRequestedToFollow(true)
}else {
    // console.log("bool true")
    setRequestedToFollow(false)
}
console.log(requestedToFollow)
    //   setRequestedToFollow(true)
    //   setRequestedToFollow(data)
    //   console.log("----",requestedToFollow)
    }).catch(error => {
                console.log({error})
            });
        // };
        // fetchData();
      }, []);
    if (currUserId !== userId) {
        if (currentlyFollowing) {
            followButton = <div className={classes.followbtn} id={userId} onClick={unfollowHandler}>- UnFollow</div>
            console.log("currentlyFollowing", currentlyFollowing);
        } else if (requestedToFollow) {
            followButton = <div className={classes.followbtn} id={userId}>Requested</div>
        } else {
            followButton = <div className={classes.followbtn} id={userId} onClick={followHandler}>+ Follow</div>
        }       
        messageButton = <GreyButton>Message</GreyButton> 
    }
 
    const { error , isLoaded, data } = useGet(`/user?id=${userId}`)
    if (data.data !== undefined) {

        if( data.data[0].public == 0 ){
            localStorage.setItem('isChecked', true);
        }else {
            localStorage.setItem('isChecked', false);
        }
    }
     console.log("user data (profile)", data.data)
      if (!isLoaded) return <div>Loading...</div>
      if (error) return <div>Error: {error.message}</div>

       console.log("user data (profile)", data.data)
        if (!isLoaded) return <div>Loading...</div>
        if (error) return <div>Error: {error.message}</div>
    

    // store follower in db
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
    
    // delete follower from db
    const deleteFollow = (targetId) => {
        console.log("targetid (deleteFollow)", targetId)

        const data = {
            // id: 0,
            sourceid: parseInt(currUserId),
            targetid: parseInt(targetId),
            status: 1
        };

        const reqOptions = {
            method: "DELETE",
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
            <ToggleSwitch
                label={"Private"}
                value={"Private"}
                // onClick={setPublicChangeHandler}
                // onChange={setPublicChangeHandler}
                onClick={setPublicityHandler}
            ></ToggleSwitch>
            {/* } */}
        {/* {currUserId === userId && !publicity && 
            <ToggleSwitch 
                label={"Public"}
                value={"Public"}
                // onClick={setPrivateChangeHandler}
                // onChange={setPrivateChangeHandler}
                onChange={setPublicityHandler}
            ></ToggleSwitch>}             */}
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