import { useEffect, useState } from "react";
import AllUserChatItems from "./AllUserChatItems";
import styles from "./UserChatMainArea.module.css";

const ChatMainArea = (props) => {
    // console.log("user chat followers in chatarea", props.followersList);

    return (
        <div className={styles["user-list"]}>
            <AllUserChatItems followersList={props.followersList}/>
        </div>
    );
};

export default ChatMainArea;