import { useEffect, useState, useContext } from "react";
import AllUserChatItems from "./AllUserChatItems";
import styles from "./UserChatMainArea.module.css";
import AuthContext from "../../store/auth-context";
import Chatbox from "../Chatbox/Chatbox.js";

const ChatMainArea = (props) => {
    // console.log("user chat followers in chatarea", props.followersList);

    const [chatboxOpen, setChatboxOpen] = useState(false);
    const [followerId, setFollowerId] = useState(0);

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

    console.log("loggedIn at UserChatMainArea", ctx.isLoggedIn);
    
    return (
        <div 
        className={styles["user-list"]}
        style={{height: window.innerHeight}}
        >
            {!chatboxOpen && <AllUserChatItems onOpenChatbox={openUserChatboxHandler}/>}
            {chatboxOpen && <Chatbox chatboxId={followerId} onCloseChatbox={closeUserChatboxHandler}/>}
        </div>
    );
};

export default ChatMainArea;