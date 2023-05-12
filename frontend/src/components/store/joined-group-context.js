import { useState } from "react";

export const JoinedGroupContext = React.createContext({
    joinedGrps: [],
    setJoinedGrps: () => {},
    getJoinedGrps: () => {},
    requestToJoin: (grp) => {},
    requestToParticipate: (user) => {},
    join: (followUser) => {},
    unjoin: (unfollowUser) => {},
    // receiveMsgFollowing: (friendId, open) => {},
    // chatNotiUserArr: [],
    // setChatNotiUserArr: () => {},
});

export const JoinedGroupContextProvider = (props) => {
    const [joinedGrps, setJoinedGrps] = useState([]);


    return (
        <JoinedGroupContext.Provider value={{
            joinedGrps: joinedGrps,
            setFollowing: setJoinedGrps,
            getFollowing: getJoinedHandler, // implement
            requestToJoin: requestToJoinHandler,
            requestToParticipate: requestToParticipateHandler,
            join: joinHandler,
            unjoin: unjoinHandler,
            // receiveMsgFollowing: receiveMsgHandler,
            // chatNotiUserArr: chatNotiUserArr,
            // setChatNotiUserArr: setChatNotiUserArr,
        }}>
            {props.children}
        </JoinedGroupContext.Provider>
    );
};