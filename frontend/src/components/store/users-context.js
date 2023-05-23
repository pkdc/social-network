import React, {useState, useEffect} from "react";

export const UsersContext = React.createContext({
    users: [],
    onlineUsers: [],
    onNewUserReg: () => {},
    onPrivacyChange: () => {},
    // onOnline: (onlineUser) => {},
    // onOffline: (offlineUser) => {},
});

export const UsersContextProvider = (props) => {
    const [usersList, setUsersList] = useState([]);

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

    const privacyChangeHandler = (userid, privacy) => {
        // usersList[userid].public = privacy;
        setUsersList((prevUsersList) => prevUsersList.map((user) => {
            if (user.id === userid){
                return user.public = privacy;
            } else {
                return user;
            }
        }));
    };

    useEffect(getUsersHandler, []);

    return (
        <UsersContext.Provider value={{
            users: usersList,
            // onlineUsers: onlineUsersList,
            onNewUserReg: getUsersHandler,
            onPrivacyChange: privacyChangeHandler,
            // onOnline: userOnlineHandler,
            // onOffline: userOfflineHandler,
        }}>
        {props.children}
        </UsersContext.Provider>
    );
};