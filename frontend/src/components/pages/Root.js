import {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../Navigation/TopNav";
import ChatSidebar from "../Navigation/ChatSidebar";

const Root = (props) => {
    const userFollowersUrl = "http://localhost:8080/user-follower"; // later
    const tempUserUrl = "http://localhost:8080/user"; // temp

    const [followersList, setFollowersList] = useState([]);
    const [joinedGroupList, setJoinedGroupList] = useState([]);

    // get followers
    useEffect(() => {
        // fetch(userFollowersUrl)
        fetch(tempUserUrl)
        .then(resp => resp.json())
        .then(data => {
            console.log("chatmainarea user: ", data)
            setFollowersList(data);
        })
        .catch(
            err => console.log(err)
        );
    }, []);

    console.log("user chat followers (root)", followersList);

    return <>
    <TopNav onLogout={props.onLogout}/>
    <ChatSidebar followersList={followersList}/>
    <Outlet/>
    </>
    
};

export default Root;