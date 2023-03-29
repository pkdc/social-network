import { useState } from "react";
import SwitchChatTopBar from "../chat/SwitchChatTopBar";
import ChatMainArea from "../chat/UserChat/UserChatMainArea";
import styles from "./ChatSidebar.module.css";


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
            // onClick={clickHandler}
        >
            <SwitchChatTopBar />
            <ChatMainArea />
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