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
   
    // useEffect(() => {
    //     console.log("msgAreaRef scroll", msgAreaRef.current);
    //     console.log("scrollHeight: ", msgAreaRef.current.scrollHeight);
        // if (msgAreaRef.current) msgAreaRef.current.scrollTop = msgAreaRef.current.scrollHeight - msgAreaRef.current.clientHeight;
    // }, [])
    
    setTimeout(() => {if (msgAreaRef.current) msgAreaRef.current.scrollTop = msgAreaRef.current.scrollHeight - msgAreaRef.current.clientHeight}, 300)
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