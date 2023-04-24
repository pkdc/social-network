import { useEffect, useRef, useState } from "react";
import Card from "../../UI/Card";
import AllOldMsgItems from "./AllOldMsgItems";
import AllNewMsgItems from "./AllNewMsgItems";
import styles from "./ChatboxMsgArea.module.css";

const ChatboxMsgArea = (props) => {
    const msgAreaRef = useRef();
    // const [areaScrollTop, setAreaScrollTop] = useState();  

    const scrollBottom = () => msgAreaRef.current.scrollTop = msgAreaRef.current.scrollHeight - msgAreaRef.current.clientHeight;

    useEffect(() => {msgAreaRef.current && scrollBottom();}, [msgAreaRef.current, props.justSent]);
    
    // props.justSent && msgAreaRef.current && scrollBottom();

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