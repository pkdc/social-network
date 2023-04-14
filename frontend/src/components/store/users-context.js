import React, {useState, useEffect} from "react";

export const UsersContext = React.createContext({
    users: []
});

export const UsersContextProvider = (props) => {
    const [usersList, setUsersList] = useState([]);

    // get users
    const userUrl = "http://localhost:8080/user";
    useEffect(() => {
        fetch(userUrl)
        .then(resp => resp.json())
        .then(data => {
            console.log("user (context): ", data)
            let [usersArr] = Object.values(data); 
            setUsersList(usersArr);
        })
        .catch(
            err => console.log(err)
        );
    }, []);

    return (
        <UsersContext.Provider value={{
            users: usersList,
        }}>
        {props.children}
        </UsersContext.Provider>
    );
};