import { useRef } from "react";
import Form from "../../UI/Form";
import send from '../../assets/send.svg';
import SendMsgForm from "../../UI/SendMsgForm";
import CreateMsgTextarea from "../../UI/CreateMsgTextarea";
import styles from "./UserSendMsg.module.css";

const UserSendMsg = (props) => {
    const msgRef = useRef();

    const sendMsgHandler = (e) => {
        e.preventDefault();
        console.log("user sent msg: ", msgRef.current.value);
        props.onSendMsg(msgRef.current.value);
    }
    const windowHeight = window.innerHeight;
    return (
        <SendMsgForm onSubmit={sendMsgHandler} className={styles["send-msg"]} style={{top: window.innerHeight*0.78}}>
            <CreateMsgTextarea className={styles["send-msg-input"]} reference={msgRef}/>
            <button type="submit" className={styles["send"]}>
                <img src={send} alt='' />
            </button>
        </SendMsgForm>
    );
};

export default UserSendMsg;