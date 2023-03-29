import styles from "./ChatSidebar.module.css";
import classes from '../pages/layout.module.css';
import { useState } from "react";

const ChatSidebar = () => {
    const [hovered, setHovered] = useState(false);

    const showChatSidebarHandler = () => {};

    // const sidebarHoveredHandler = () => {};
    return (
        <>
        <div 
            className={`${styles["sidebar"]} ${hovered ? styles["hovered"] : ""}`} 
            onMouseEnter={() => setHovered(true)} 
            onMouseLeave={() => setHovered(false)}
            >
        </div>
        <div>
        {/* <div className={classes.right}> */}
        <button 
            className={`${styles["show-sidebar-btn"]} ${hovered ? styles["hovered"] : ""}`} 
            onClick={showChatSidebarHandler} 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            >&lt;&lt;</button>
        </div>
        
        </>
        
    );
};

export default ChatSidebar;