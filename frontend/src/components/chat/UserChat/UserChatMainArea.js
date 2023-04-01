import { useEffect, useState, useContext } from "react";
import AllUserChatItems from "./AllUserChatItems";
import styles from "./UserChatMainArea.module.css";
import AuthContext from "../../store/auth-context";

const ChatMainArea = (props) => {
    // console.log("user chat followers in chatarea", props.followersList);

    const [chatboxOpen, setChatboxOpen] = useState(false);

    const ctx = useContext(AuthContext);

    const openUserChatboxHandler = (followerId) => {
        console.log("chatbox open for ", followerId);
    };

    console.log("loggedIn at UserChatMainArea", ctx.isLoggedIn);
    
    return (
        <div 
        className={styles["user-list"]}
        style={{height: window.innerHeight}}
        >
            <AllUserChatItems followersList={props.followersList} onOpenChatbox={openUserChatboxHandler}/>
        </div>
    );
};

export default ChatMainArea;