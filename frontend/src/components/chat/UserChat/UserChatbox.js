import { useEffect, useContext, useState, useRef } from "react";
import UsersContext from "../../store/users-context";
import WebSocketContext from "../../store/websocket-context";
import Form from "../../UI/Form";
import send from '../../assets/send.svg';
import CreatePostTextarea from "../../UI/CreatePostTextarea";

const UserChatbox = (props) => {

    const usersCtx = useContext(UsersContext);
    console.log("chatbox: ", usersCtx.users);

    const wsCtx = useContext(WebSocketContext);
    console.log("ws in UserChatbox: ",wsCtx.websocket);
    // const [msg, setMsg] = useState("");
    const msgRef = useRef();

    const sendMsgHandler = (e) => {
        e.preventDefault();
        console.log("user sent msg: ", msgRef.current.value);

        wsCtx.websocket.send(msgRef.current.value);
    };

    return (
        <Form onSubmit={sendMsgHandler}>
            <CreatePostTextarea reference={msgRef}/>
            <button type="submit">
                <img src={send} alt='' />
            </button>
        </Form>
    );
};

export default UserChatbox;