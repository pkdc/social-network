import {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../Navigation/TopNav";
import ChatSidebar from "../Navigation/ChatSidebar";
import UsersContext from "../store/users-context";
import WebSocketContext from "../store/websocket-context";

const Root = (props) => {
    // const userFollowersUrl = "http://localhost:8080/user-follower";
    const userUrl = "http://localhost:8080/user";

    const [usersList, setUsersList] = useState([]);
    const [joinedGroupList, setJoinedGroupList] = useState([]);

    const [socket, setSocket] = useState(null);

    // websocket
    useEffect(() => {
        const newSocket = new WebSocket("ws://localhost:8080/ws");
  
        newSocket.onOpen = () => {
            console.log("ws connected");
            setSocket(newSocket);
        };
        
        newSocket.onClose = () => {
            console.log("bye ws");
            setSocket(null);
        };
  
        newSocket.onError = (err) => console.log("ws error");
  
        return () => {
            newSocket.close();
        };   
  }, []);

    // get users
    useEffect(() => {
        fetch(userUrl)
        .then(resp => resp.json())
        .then(data => {
            console.log("chatmainarea user: ", data)
            let [usersArr] = Object.values(data); 
            setUsersList(usersArr);
        })
        .catch(
            err => console.log(err)
        );
    }, []);

    console.log("user chat users (root)", usersList);

    return <>
    <UsersContext.Provider value={{
        users: usersList
    }}>
        <WebSocketContext.Provider value={{
            websocket: socket
        }}>
            <TopNav/>
            <ChatSidebar/>
            <Outlet/>
        </WebSocketContext.Provider>
    </UsersContext.Provider>
    </>
};

export default Root;