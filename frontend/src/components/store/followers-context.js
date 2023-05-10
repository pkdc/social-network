import React from "react";

const FollowersContext = React.createContext({
    followers: [],
    setFollowers: () => {},
});

export default FollowersContext;