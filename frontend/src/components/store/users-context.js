import React, {useState, useEffect} from "react";

export const UsersContext = React.createContext({
    users: [],
    onlineUsers: [],
    onNewUserReg: () => {},
    // onOnline: (onlineUser) => {},
    // onOffline: (offlineUser) => {},
});

export const UsersContextProvider = (props) => {
    const [usersList, setUsersList] = useState([]);
    // const [onlineUsersList, setOnlineUsersList] = useState([]);

    // get users
    const getUsersHandler = () => {
        const userUrl = "http://localhost:8080/user";
        fetch(userUrl)
        .then(resp => resp.json())
        .then(data => {
            console.log("user (context): ", data);
            let [usersArr] = Object.values(data); 
            setUsersList(usersArr);
        })
        .catch(
            err => console.log(err)
        );
    };

    useEffect(getUsersHandler, []);
    // const userOnlineHandler = (onlineUser) => {
    //     console.log("before login",onlineUsersList);
    //     setOnlineUsersList(prevOnlineUsersList => [...prevOnlineUsersList, onlineUser]);
    //     console.log("after login",onlineUsersList);
    // };

    // const userOfflineHandler = (offlineUser) => {
    //     console.log("before logout",onlineUsersList);
    //     setOnlineUsersList(prevOnlineUsersList => {
    //         prevOnlineUsersList.filter((prevOnlineUser) => prevOnlineUser.id !== offlineUser.id);
    //     })
    //     console.log("after logout", onlineUsersList);
    // };

    // console.log("onlineUsersList outside",onlineUsersList);

    return (
        <UsersContext.Provider value={{
            users: usersList,
            // onlineUsers: onlineUsersList,
            onNewUserReg: getUsersHandler,
            // onOnline: userOnlineHandler,
            // onOffline: userOfflineHandler,
        }}>
        {props.children}
        </UsersContext.Provider>
    );
};