import React from "react";

const FollowingContext = React.createContext({
    following: [],
    setFollowing: () => {},
});


export default FollowingContext;