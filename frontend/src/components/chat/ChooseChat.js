import { useState } from "react";
import SmallButton from "../UI/SmallButton";
import UserChatMainArea from "./UserChat/UserChatMainArea";
import GroupChatMainArea from "./GroupChat/GroupChatMainArea";
import styles from "./ChooseChat.module.css";

const ChooseChat = (props) => {
    const [grpActive, setGrpActive] = useState(false);

    const showUserListHandler = () => {
        console.log("User list");
        setGrpActive(false);

    };

    const showGrpListHandler = () => {
        console.log("Grp list");
        setGrpActive(true);
    };

    return (
        <>
        <div className={styles["switch-bar"]}>
            <SmallButton 
                className={`${!grpActive && styles["active"]} ${styles["switch-bar-btn"]}`}
                onClick={showUserListHandler}
            >Users</SmallButton>

            <SmallButton 
                className={`${grpActive && styles["active"]} ${styles["switch-bar-btn"]}`}
                onClick={showGrpListHandler}
            >Groups</SmallButton>
        </div>
        {!grpActive && <UserChatMainArea followersList={props.followersList}/>}
        {grpActive && <GroupChatMainArea />}
        </>
    );
};

export default ChooseChat;