import React, { useContext, useState } from "react";
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

    const followHandler = (followUserId) => {
        // console.log("cur user is gonna follow (ctx) ", followUserId);
        const followUser = usersCtx.users.find(user => user.id === followUserId);
        setFollowing(prevFollowing => [...prevFollowing, followUser]);
        // console.log("cur user is following (ctx) ", following);
    };
    // console.log("cur user is following (ctx) (outsid e)", following);

    const unfollowHandler = (unfollowUserId) => {
        const unfollowUser = usersCtx.users.find(user => user.id === unfollowUserId);
        setFollowing(prevFollowing => {
            prevFollowing.filter(() => unfollowUserId);
        });
    };

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