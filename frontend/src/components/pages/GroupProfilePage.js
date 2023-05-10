import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AllEvents from "../group/AllEvents";
import AllGroupPosts from "../group/AllGroupPosts";
import CreateEvent from "../group/CreateEvent";
import CreateGroup from "../group/CreateGroup";
import CreateGroupPost from "../group/CreateGroupPost";
import GroupEvent from "../group/GroupEvent";
import GroupProfile from "../group/GroupProfile";
// import AllPosts from "../posts/AllPosts";
// import CreatePost from "../posts/CreatePost";

// import classes from './GroupProfilePage.module.css';
import classes from './layout.module.css';

function GroupProfilePage() {

    const { state } = useLocation();
    const { id } = state; 
    console.log("group id", id);

    return (
    <div className={classes.container}>
        <div className={classes.mid}>
            <GroupProfile groupid={id}></GroupProfile>
            <CreateGroupPost groupid={id}/>
            <AllGroupPosts groupid={id}/>
      
        </div>
        <div className={classes.right}>
        <CreateEvent groupid={id}></CreateEvent>
        <AllEvents groupid={id}></AllEvents>
        </div>
    </div>
  
)}

export default GroupProfilePage;
