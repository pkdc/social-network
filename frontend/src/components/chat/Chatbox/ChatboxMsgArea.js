import { useEffect, useRef, useState } from "react";
import Card from "../../UI/Card";
import AllOldMsgItems from "./AllOldMsgItems";
import AllNewMsgItems from "./AllNewMsgItems";
import styles from "./ChatboxMsgArea.module.css";

const ChatboxMsgArea = (props) => {
    const msgAreaRef = useRef();
    // const [areaScrollTop, setAreaScrollTop] = useState();

    // const scrollHandler = () => {
    //     console.log("scrollHandler called");
    //     console.log("scrollTop", msgAreaRef.current.scrollTop);
    // };
    
    setTimeout(() => {
            if (msgAreaRef.current) {
                msgAreaRef.current.scrollTop = msgAreaRef.current.scrollHeight - msgAreaRef.current.clientHeight;
            }
        }, 50);
    
    return (
        <div 
            className={styles["msg-area"]} 
            style={{height: `${window.innerHeight-316}px`}} 
            ref={msgAreaRef}
            // scrolltop={}
            // onScroll={scrollHandler}
        >
            <AllOldMsgItems oldMsgItems={props.oldMsgItems}/>
            <AllNewMsgItems newMsgItems={props.newMsgItems}/>
        </div>
    );
};

export default ChatboxMsgArea;