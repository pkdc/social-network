import React, { useState } from "react";
import useGet from "../fetch/useGet";

export const FollowingContext = React.createContext({
    following: [],
    getFollowing: () => {},
    // follow: (followUserId) => {},
    // unfollow: (unfollowUserId) => {},
});

export const FollowingContextProvider = (props) => {
    const selfId = localStorage.getItem("user_id");
    const followingUrl = `http://localhost:8080/user-following?id=${selfId}`;
    const [following, setFollowing] = useState([]);

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

    // const followHandler = (followUserId) => {
    //     console.log("cur user is gonna follow (ctx) ", followUserId);
    //     setFollowing(prevFollowing => [...prevFollowing, followUserId]);
    //     console.log("cur user is following (ctx) ", following);
    // };

    // const unfollowHandler = (unfollowUserId) => {
    //     setFollowing(prevFollowing => {
    //         prevFollowing.filter(() => unfollowUserId);
    //     });
    // };

    return (
        <FollowingContext.Provider value={{
            following: following,
            getFollowing: getFollowingHandler,
            // follow: followHandler,
            // unfollow: unfollowHandler,
        }}>
            {props.children}
        </FollowingContext.Provider>
    );
};