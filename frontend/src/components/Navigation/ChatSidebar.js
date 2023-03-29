import styles from "./ChatSidebar.module.css";
import classes from '../pages/layout.module.css';
import { useState } from "react";

const ChatSidebar = () => {
    const [hovered, setHovered] = useState(false);
    const [showChat, setShowChat] = useState(false);

    const clickHandler = () => !showChat ? setShowChat(true) : setShowChat(false);

    // const sidebarHoveredHandler = () => {};
    return (
        <>
        <div 
            className={`${styles["sidebar"]} ${hovered ? styles["hovered"] : ""} ${showChat ? styles["show-chat"] : ""}`}
            onMouseEnter={() => setHovered(true)} 
            onMouseLeave={() => setHovered(false)}
            onClick={clickHandler}
            >
        </div>
        <div>
        {/* <div className={classes.right}> */}
        <button 
            className={`${styles["show-sidebar-btn"]} ${hovered ? styles["hovered"] : ""} ${showChat ? styles["show-chat"] : ""}`} 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={clickHandler}
            >{showChat ? ">" : "<"}</button>
        </div>
        
        </>
        
    );
};

export default ChatSidebar;