import {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../navigation/TopNav";
import ChatSidebar from "../navigation/ChatSidebar";
import { UsersContextProvider } from "../store/users-context";
import { FollowingContextProvider } from "../store/following-context";
import { WebSocketContextProvider } from "../store/websocket-context";

const Root = (props) => {
    // const userFollowersUrl = "http://localhost:8080/user-follower";
    // const userUrl = "http://localhost:8080/user";

    // const [usersList, setUsersList] = useState([]);
    // const [joinedGroupList, setJoinedGroupList] = useState([]);

    console.log("Root");
    
    return (
        <>
        <UsersContextProvider>
            <WebSocketContextProvider>
                <FollowingContextProvider>
                    <TopNav/>
                    <ChatSidebar/>
                    <Outlet/>
                </FollowingContextProvider>
            </WebSocketContextProvider>
        </UsersContextProvider>
        </>
    );
};

export default Root;