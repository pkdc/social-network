import {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../Navigation/TopNav";
import ChatSidebar from "../Navigation/ChatSidebar";
import UsersContext from "../store/users-context";
import FollowersContext from "../store/followers-context.js";
import FollowingContext from "../store/following-context";
import WebSocketContext from "../store/websocket-context";
import { UsersContextProvider } from "../store/users-context";
import { FollowingContextProvider } from "../store/following-context";

const Root = (props) => {
    // const userFollowersUrl = "http://localhost:8080/user-follower";
    // const userUrl = "http://localhost:8080/user";

    // const [usersList, setUsersList] = useState([]);
    const [joinedGroupList, setJoinedGroupList] = useState([]);

    // // get users
    // useEffect(() => {
    //     fetch(userUrl)
    //     .then(resp => resp.json())
    //     .then(data => {
    //         console.log("user (Root): ", data)
    //         let [usersArr] = Object.values(data); 
    //         setUsersList(usersArr);
    //     })
    //     .catch(
    //         err => console.log(err)
    //     );
    // }, []);

    // console.log("user chat users (root)", usersList);

    const [socket, setSocket] = useState(null);

    // websocket
    useEffect(() => {
        // const newSocket = new WebSocket("ws://localhost:8080/ws");
        const newSocket = new WebSocket("ws://localhost:8080/ws")
  
        newSocket.onopen = () => {
            console.log("ws connected");
            setSocket(newSocket);
        };
        
        newSocket.onclose = () => {
            console.log("bye ws");
            setSocket(null);
        };
  
        newSocket.onerror = (err) => console.log("ws error");
  
        return () => {
            newSocket.close();
        };   
  }, []);

//   console.log("socket: ", socket);

    return <>
    <UsersContextProvider>
        <FollowingContextProvider>
            <TopNav/>
            <WebSocketContext.Provider value={{
                websocket: socket,
            }}>
                {socket ? <ChatSidebar/> : <p>Websocket trying to connect...</p>}
            </WebSocketContext.Provider>
            <Outlet/>
        </FollowingContextProvider>
    </UsersContextProvider>
    </>
};

export default Root;