import { useContext, useEffect, useState } from "react";
import Avatar from "../../UI/Avatar";
import SmallAvatar from "../../UI/SmallAvatar";
import styles from "./OldMsgItem.module.css";
import { UsersContext } from "../../store/users-context";


const OldMsgItem = (props) => {
    const selfId = +localStorage.getItem("user_id");
    const [self, setSelf] = useState();
    const usersCtx = useContext(UsersContext);

    useEffect(() => {
        setSelf(props.sourceid === selfId)
    }, [props])

    let targetUsers;
    // usersCtx.users.find((user) => user.id === wsCtx.newPrivateMsgsObj.sourceid);
    // assume usersCtx.users sorted by user id
    // console.log(usersCtx.users);
    // console.log(props.targetid);
    // console.log(props.sourceid);

    const msgUser = usersCtx.users.find(user => user.id === props.sourceid);

    // const { error, isLoaded, data } = useGet(`/user?id=${props.sourceid}`);

    // if (!isLoaded) return <div>Loading...</div>
    // if (error) return <div>Error: {error.message}</div>

    return (
        <div className={`${self ? styles["self-msg"] : styles["frd-msg"]}`}>

            {!self &&
                <SmallAvatar src={msgUser.avatar}height={30} width={30}></SmallAvatar>
            }
            <div className={styles.wrapper}>
                <div className={`${self ? styles["self-username"] : styles["frd-username"]}`}>{msgUser.fname} {msgUser.lname}</div>
                <div className={`${self ? styles["chat-bubble-self"] : styles["chat-bubble-frd"]}`}>
                    {props.msg}
                </div>
            </div>
            {/* {self &&
                <SmallAvatar height={30} width={30}></SmallAvatar>
            } */}
        </div>
    );
};

export default OldMsgItem;