import React, { useContext, useEffect, useState } from "react";
import useGet from "../fetch/useGet";
import { UsersContext } from "./users-context";

export const FollowingContext = React.createContext({
    following: [],
    getFollowing: () => {},
    follow: (followUser) => {},
    unfollow: (unfollowUser) => {},
});

export const FollowingContextProvider = (props) => {
    const selfId = localStorage.getItem("user_id");
    const followingUrl = `http://localhost:8080/user-following?id=${selfId}`;
    const [following, setFollowing] = useState([]);
    const usersCtx = useContext(UsersContext);

    // get from db
    const getFollowingHandler = () => {
        fetch(followingUrl)
        .then(resp => resp.json())
        .then(data => {
            // console.log("user (context): ", data);
            let [followingArr] = Object.values(data); 
            setFollowing(followingArr);
        })
        .catch(
            err => console.log(err)
        );
        console.log("following (ctx)", following)
    };

    const followHandler = (followUser) => {
        setFollowing(prevFollowing => [...prevFollowing, followUser]);
    };

    const unfollowHandler = (unfollowUser) => {
        setFollowing(prevFollowing => {
            prevFollowing.filter(() => unfollowUser);
        });
    };

    useEffect(() => getFollowingHandler, []);

    return (
        <FollowingContext.Provider value={{
            following: following,
            getFollowing: getFollowingHandler,
            follow: followHandler,
            unfollow: unfollowHandler,
        }}>
            {props.children}
        </FollowingContext.Provider>
    );
};