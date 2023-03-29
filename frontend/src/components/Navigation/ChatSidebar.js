import styles from "./ChatSidebar.module.css";
import classes from '../pages/layout.module.css';

const ChatSidebar = () => {
    const showChatSidebarHandler = () => {};
    return (
        <>
        <div className={styles["sidebar"]}>

        </div>
        <div className={styles["show-sidebar-btn"]}>
        {/* <div className={classes.right}> */}
        <button onClick={showChatSidebarHandler}></button>
        </div>
        
        </>
        
    );
};

export default ChatSidebar;