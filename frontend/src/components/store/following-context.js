import React, { useContext, useEffect, useState } from "react";
import useGet from "../fetch/useGet";
import { UsersContext } from "./users-context";

export const FollowingContext = React.createContext({
    following: [],
    setFollowing: () => {},
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
            console.log("followingArr (context): ", data);
            let [followingArr] = Object.values(data); 
            setFollowing(followingArr);
            localStorage.setItem("following", JSON.stringify(followingArr));
        })
        .catch(
            err => console.log(err)
        );
    };

    const followHandler = (followUser) => {
        setFollowing([followUser])
        if (following) {
            setFollowing(prevFollowing => [...prevFollowing, followUser]);

            const storedFollowing = JSON.parse(localStorage.getItem("following"));
            const curFollowing = [...storedFollowing, followUser];
            localStorage.setItem("following", JSON.stringify(curFollowing));
        } else {
            setFollowing([followUser]);
            localStorage.setItem("following", JSON.stringify([followUser]));
        }
        console.log("stored fol", JSON.parse(localStorage.getItem("following")));
    };

    const unfollowHandler = (unfollowUser) => {
        setFollowing(prevFollowing => {
            prevFollowing.filter(() => unfollowUser);
        });
        localStorage.setItem("following", JSON.stringify(following));
        // console.log("following (unfollow) (ctx)", following); // not accurate
        const storedFollowing = JSON.parse(localStorage.getItem("following"));
        console.log("stored fol", storedFollowing);
    };

    // useEffect(() => getFollowingHandler, []);
    useEffect(() => getFollowingHandler(), []);
    // getFollowingHandler();
    // useEffect(() => console.log("following (ctx)", following),[])

    return (
        <FollowingContext.Provider value={{
            following: following,
            setFollowing: setFollowing,
            getFollowing: getFollowingHandler,
            follow: followHandler,
            unfollow: unfollowHandler,
        }}>
            {props.children}
        </FollowingContext.Provider>
    );
};