import { useEffect, useState, useContext } from "react";
import AllUserChatItems from "./UserChat/AllUserChatItems";
import styles from "./ChatMainArea.module.css";
import { AuthContext } from "../store/auth-context";
import Chatbox from "./Chatbox/Chatbox.js";

const ChatMainArea = (props) => {
    // console.log("user chat followers in chatarea", props.followersList);

    const [chatboxOpen, setChatboxOpen] = useState(false);
    const [followerId, setFollowerId] = useState(0);
    const [grpId, setGrpId] = useState(0);

    const ctx = useContext(AuthContext);

    const openUserChatboxHandler = (followerId) => {
        console.log("chatbox open for ", followerId);
        setChatboxOpen(true);
        setFollowerId(followerId);
    };

    const closeUserChatboxHandler = () => {
        console.log("chatbox open for ", followerId);
        setChatboxOpen(false);
    };

    const receiveNewMsgHandler = (chatboxId) => {
        console.log();
    };

    console.log("loggedIn at UserChatMainArea", ctx.isLoggedIn);
    
    return (
        <div 
        className={styles["user-list"]}
        style={{height: window.innerHeight -110}}
        >
            {!props.grpChat && !chatboxOpen && <AllUserChatItems onOpenChatbox={openUserChatboxHandler}/>}
            {!props.grpChat && chatboxOpen &&
                <Chatbox 
                    chatboxId={followerId} 
                    onCloseChatbox={closeUserChatboxHandler}
                    onReceiveNewMsg={receiveNewMsgHandler}
                />
            }
            {props.grpChat && !chatboxOpen}
            {props.grpChat && chatboxOpen && 
                <Chatbox 
                    chatboxId={grpId} 
                    onCloseChatbox={closeUserChatboxHandler}
                    onReceiveNewMsg={receiveNewMsgHandler}
                />}
        </div>
    );
};

export default ChatMainArea;