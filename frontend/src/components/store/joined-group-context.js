import React, { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "./websocket-context";

export const JoinedGroupContext = React.createContext({
    joinedGrps: [],
    setJoinedGrps: () => {},
    getJoinedGrps: () => {},
    requestToJoin: (joinGrp) => {},
    requestToParticipate: (grp, targetUser) => {},
    join: (toJoinGrp, user) => {},
    leave: (toLeaveGrp, user) => {},
    // receiveMsgFollowing: (friendId, open) => {},
    // chatNotiUserArr: [],
    // setChatNotiUserArr: () => {},
});

export const JoinedGroupContextProvider = (props) => {
    const selfId = +localStorage.getItem("user_id");
    const [joinedGrps, setJoinedGrps] = useState([]);
    const joinedGroupingUrl = `http://localhost:8080/group-member?userid=${selfId}`;

    const wsCtx = useContext(WebSocketContext);

    // get from db
    const getJoinedGrpsHandler = () => {
        fetch(joinedGroupingUrl)
        .then(resp => resp.json())
        .then(data => {
            console.log("joinedGroupsArr (context): ", data);
            let [joinedGroupsArr] = Object.values(data); 
            setJoinedGrps(joinedGroupsArr);
            localStorage.setItem("joinedGroups", JSON.stringify(joinedGroupsArr));
        })
        .catch(
            err => console.log(err)
        );
    };

    const requestToJoinHandler = (joinGrp) => {
        console.log("request to join user (context): ", +selfId);
        console.log("request to join grp (context): ", joinGrp);

        const joinGrpPayloadObj = {};
        joinGrpPayloadObj["label"] = "noti";
        joinGrpPayloadObj["id"] = Date.now();
        joinGrpPayloadObj["type"] = "join-req";
        joinGrpPayloadObj["sourceid"] = +selfId;
        joinGrpPayloadObj["targetid"] = joinGrp.id;
        joinGrpPayloadObj["createdat"] = Date.now().toString();
        console.log("gonna send join grp req : ", joinGrpPayloadObj);
        if (wsCtx.websocket !== null) wsCtx.websocket.send(JSON.stringify(joinGrpPayloadObj));
    };

    const requestToParticipateHandler = (grp, targetUser) => {
        console.log("request to Participate user (context): ", targetUser.id);
        console.log("request to Participate grp (context): ", grp);

        const participateGrpPayloadObj = {};
        participateGrpPayloadObj["label"] = "noti";
        participateGrpPayloadObj["id"] = Date.now();
        participateGrpPayloadObj["type"] = "participate-req";
        participateGrpPayloadObj["sourceid"] = grp.id;
        participateGrpPayloadObj["targetid"] = targetUser.id;
        participateGrpPayloadObj["createdat"] = Date.now().toString();
        console.log("gonna send participate req : ", participateGrpPayloadObj);
        if (wsCtx.websocket !== null) wsCtx.websocket.send(JSON.stringify(participateGrpPayloadObj));
    };

    const joinHandler = (toJoinGrp, user) => {
        // followUser["chat_noti"] = false; // add noti to followUser
        if (joinedGrps) { // not empty
            setJoinedGrps(prevJoinedGrps => [...prevJoinedGrps, toJoinGrp]);

            const storedJoinedGrps = JSON.parse(localStorage.getItem("joined-grps"));
            const curJoined = [...storedJoinedGrps, toJoinGrp];
            localStorage.setItem("joined", JSON.stringify(curJoined));
        } else {
            setJoinedGrps([toJoinGrp]);
            localStorage.setItem("joined-grps", JSON.stringify([toJoinGrp]));
        }
        console.log("locally stored joined grp (jg ctx)", JSON.parse(localStorage.getItem("joined-grps")));
    };

    const leaveHandler = (toLeaveGrp, user) => {
        console.log("user (leaveHandler)", user);
        console.log("leave grp (leaveHandler)", toLeaveGrp);
        setJoinedGrps(prevJoinedGrps => prevJoinedGrps.filter((prevJoinedGrp) => prevJoinedGrp.id !== toLeaveGrp.id));
        const storedJoinedGrps = JSON.parse(localStorage.getItem("joined-grps"));
        const curJoinedGrps = storedJoinedGrps.filter((prevJoinedGrp) => prevJoinedGrp.id !== toLeaveGrp.id);
        localStorage.setItem("joined-grps", JSON.stringify(curJoinedGrps));
        console.log("locally stored joined-grps (leaveHandler)", JSON.parse(localStorage.getItem("joined-grps")));
    };

    useEffect(() => getJoinedGrpsHandler(), []);

    return (
        <JoinedGroupContext.Provider value={{
            joinedGrps: joinedGrps,
            setJoinedGrps: setJoinedGrps,
            getFollowing: getJoinedGrpsHandler, // implement
            requestToJoin: requestToJoinHandler,
            requestToParticipate: requestToParticipateHandler,
            join: joinHandler,
            leave: leaveHandler,
            // receiveMsgFollowing: receiveMsgHandler,
            // chatNotiUserArr: chatNotiUserArr,
            // setChatNotiUserArr: setChatNotiUserArr,
        }}>
            {props.children}
        </JoinedGroupContext.Provider>
    );
};