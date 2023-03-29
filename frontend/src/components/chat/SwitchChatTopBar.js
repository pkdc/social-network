import { useState } from "react";
import SmallButton from "../UI/SmallButton";

import styles from "./SwitchChatTopBar.module.css";
const SwitchChatTopBar = () => {
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
    );
};

export default SwitchChatTopBar;