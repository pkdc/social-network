import { useRef, useState } from "react";
import EmojiPicker from 'emoji-picker-react';
import Form from "../UI/Form";
import send from '../assets/send.svg';
import SendMsgForm from "../UI/SendMsgForm";
import CreateMsgTextarea from "../UI/CreateMsgTextarea";
import SmallButton from "../UI/SmallButton";
import styles from "./SendMsg.module.css";

const UserSendMsg = (props) => {
    const msgRef = useRef();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const sendMsgHandler = (e) => {
        e.preventDefault();
        console.log("user sent msg: ", msgRef.current.value);
        props.onSendMsg(msgRef.current.value);
        msgRef.current.value = "";
    }

    const showEmojiPickerHandler = (e) => {
        e.preventDefault();
        console.log("toggle emoji picker");
    };

    const onEmojiPick = () => {};

    const windowHeight = window.innerHeight;
    return (
        <>
        {showEmojiPicker && <EmojiPicker className={styles["emoji"]} />}
        <SendMsgForm onSubmit={sendMsgHandler} className={styles["send-msg"]} style={{top: `${window.innerHeight-205}px`}}>
            <CreateMsgTextarea className={styles["send-msg-input"]} reference={msgRef}/>
            <div className={styles["show-picker"]} onClick={showEmojiPickerHandler}>&#9786;</div>
            <button type="submit" className={styles["send"]}>
                <img src={send} alt='' />
            </button>
        </SendMsgForm>
        </>
        
    );
};

export default UserSendMsg;