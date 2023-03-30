import { useEffect, useState } from "react";
import AllUserChatItems from "./AllUserChatItems";
import styles from "./UserChatMainArea.module.css";

const ChatMainArea = (props) => {
    // console.log("user chat followers in chatarea", props.followersList);

    const [chatboxOpen, setChatboxOpen] = useState(false);

    return (
        <div 
        className={styles["user-list"]}
        style={{height: window.innerHeight}}
        >
            <AllUserChatItems followersList={props.followersList}/>
        </div>
    );
};

export default ChatMainArea;