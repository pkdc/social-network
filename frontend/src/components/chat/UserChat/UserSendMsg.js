import { useRef } from "react";
import Form from "../../UI/Form";
import send from '../../assets/send.svg';
import CreatePostTextarea from "../../UI/CreatePostTextarea";
import styles from "./UserSendMsg.module.css";

const UserSendMsg = (props) => {
    const msgRef = useRef();

    const sendMsgHandler = (e) => {
        e.preventDefault();
        console.log("user sent msg: ", msgRef.current.value);
        props.onSendMsg(msgRef.current.value);
    }
    return (
        <Form onSubmit={sendMsgHandler} className={styles["send-msg"]}>
            <CreatePostTextarea reference={msgRef}/>
            <button type="submit">
                <img src={send} alt='' />
            </button>
        </Form>
    );
};

export default UserSendMsg;