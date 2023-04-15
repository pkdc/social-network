import React, { useState } from "react";

export const FollowingContext = React.createContext({
    following: [],
    follow: () => {},
    unfollow: () => {},
});

export const FollowingContextProvider = (props) => {
    const [following, setFollowing] = useState([]);

    const followHandler = (followUserId) => {
        setFollowing(prevFollowing => [...prevFollowing, followUserId]);
    };

    const unfollowHandler = (unfollowUserId) => {
        setFollowing(prevFollowing => {
            prevFollowing.filter(() => unfollowUserId);
        });
    };

    return (
        <FollowingContext.Provider value={{
            following: following,
            follow: followHandler,
            unfollow: unfollowHandler,
        }}>
            {props.children}
        </FollowingContext.Provider>
    );
};