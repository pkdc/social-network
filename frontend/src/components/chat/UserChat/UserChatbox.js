import { useEffect, useContext } from "react";
import UsersContext from "../../store/users-context";
import WebSocketContext from "../../store/websocket-context";
import Form from "../../UI/Form";
import send from '../../assets/send.svg';
import CreatePostTextarea from "../../UI/CreatePostTextarea";

const UserChatbox = (props) => {

    const usersCtx = useContext(UsersContext);
    console.log("chatbox: ", usersCtx.users);

    const wsCtx = useContext(WebSocketContext);
    useEffect(() => {

    },[]);

    const sendMsgHandler = (e) => {
        e.preventDefault();
        console.log("user sent msg: ");
    };

    return (
        <Form onSubmit={sendMsgHandler}>
            <CreatePostTextarea/>
            <button type="submit">
                <img src={send} alt='' />
            </button>
        </Form>
    );
};

export default UserChatbox;