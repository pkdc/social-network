import { useEffect, useState, useContext } from "react";
import AllUserChatItems from "./UserChat/AllUserChatItems";
import styles from "./ChatMainArea.module.css";
import { AuthContext } from "../store/auth-context";
import Chatbox from "./Chatbox/Chatbox.js";

const ChatMainArea = ({grpChat}) => {
    // console.log("user chat followers in chatarea", followersList);

    const [privChatboxOpen, setPrivChatboxOpen] = useState(false);
    const [grpChatboxOpen, setGrpChatboxOpen] = useState(false);
    const [followerId, setFollowerId] = useState(0);
    const [grpId, setGrpId] = useState(0);
    const [chatboxReceivesMsg, setChatboxReceivesMsg] = useState(0);

    const ctx = useContext(AuthContext);

    const openUserChatboxHandler = (followerId) => {
        console.log("chatbox open for ", followerId);
        setPrivChatboxOpen(true);
        setFollowerId(followerId);
    };

    const closeUserChatboxHandler = () => {
        console.log("chatbox open for ", followerId);
        setPrivChatboxOpen(false);
    };

    const receiveNewMsgHandler = (chatboxId) => {
        console.log("receiving msg from/in chatbox : ", chatboxId);
        setChatboxReceivesMsg(chatboxId);
    };

    console.log("loggedIn at UserChatMainArea", ctx.isLoggedIn);
    
    return (
        <div 
        className={styles["list"]}
        style={{height: window.innerHeight -110}}
        >
            {!grpChat && !privChatboxOpen &&
                <AllUserChatItems 
                    onOpenChatbox={openUserChatboxHandler}
                    open={privChatboxOpen}
                    grp={grpChat}
                />}
            {!grpChat && privChatboxOpen &&
                <Chatbox 
                    chatboxId={followerId} 
                    onCloseChatbox={closeUserChatboxHandler}
                    onReceiveNewMsg={receiveNewMsgHandler}
                    open={privChatboxOpen}
                    grp={grpChat}
                />
            }
            {grpChat && !grpChatboxOpen}
            {grpChat && grpChatboxOpen && 
                <Chatbox 
                    chatboxId={grpId} 
                    onCloseChatbox={closeUserChatboxHandler}
                    onReceiveNewMsg={receiveNewMsgHandler}
                    grp={grpChat}
                />}
        </div>
    );
};

export default ChatMainArea;