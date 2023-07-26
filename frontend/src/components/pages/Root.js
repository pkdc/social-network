import { useState } from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../navigation/TopNav";
import ChatSidebar from "../navigation/ChatSidebar";
import { UsersContextProvider } from "../store/users-context";
import { FollowingContextProvider } from "../store/following-context";
import { WebSocketContextProvider } from "../store/websocket-context";
import { GroupsContextProvider } from "../store/groups-context";
import { JoinedGroupContextProvider } from "../store/joined-group-context";

const Root = (props) => {
    // const userFollowersUrl = "http://localhost:8080/user-follower";
    // const userUrl = "http://localhost:8080/user";

    // const [usersList, setUsersList] = useState([]);
    // const [joinedGroupList, setJoinedGroupList] = useState([]);

    // console.log("Root");
    const [showChat, setShowChat] = useState(false);

    const chatIconClickHandler = () =>  {
        console.log("Root chat icon clicked");
        setShowChat(prev => !prev);
    };
    return (
        <>
        <UsersContextProvider>
            <WebSocketContextProvider>
                <FollowingContextProvider>
                    <GroupsContextProvider>
                        <JoinedGroupContextProvider>
                            <TopNav onClickChatIcon={chatIconClickHandler}/>
                            <ChatSidebar showChat={showChat} setShowChat={setShowChat}/>
                            <Outlet/>
                        </JoinedGroupContextProvider>
                    </GroupsContextProvider>
                </FollowingContextProvider>
            </WebSocketContextProvider>
        </UsersContextProvider>
        </>
    );
};

export default Root;