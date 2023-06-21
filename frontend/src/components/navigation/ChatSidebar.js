import { useState, useEffect } from "react";
import ChooseChat from "../chat/ChooseChat.js";
import styles from "./ChatSidebar.module.css";


const ChatSidebar = (props) => {
    const [hovered, setHovered] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const clickHandler = () => !showChat ? setShowChat(true) : setShowChat(false);

    // console.log("user chat followers (sidebar)", props.followersList);

    // const sidebarHoveredHandler = () => {};
    return (
        <>
        <div style={{height: "100%"}}>
        <div 
            className={`${styles["sidebar"]} ${hovered ? styles["hovered"] : ""} ${showChat ? styles["show-chat"] : ""}`}
            onMouseEnter={() => setHovered(true)} 
            onMouseLeave={() => setHovered(false)}
            // onClick={clickHandler}
        >
            <ChooseChat />
        </div>
        </div>
        
        <div>
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