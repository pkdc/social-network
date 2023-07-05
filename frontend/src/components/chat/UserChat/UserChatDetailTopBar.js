import Avatar from "../../UI/Avatar";
import Card from "../../UI/Card";
import useGet from "../../fetch/useGet";
import styles from "./ChatDetailTopBar.module.css";
import { Link, useNavigate } from "react-router-dom";
const UserChatDetailTopBar = (props) => {

    const { error , isLoaded, data } = useGet(`/user?id=${props.userId}`)

    if (!isLoaded) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>


    return (
        <Card className={styles["container"]}>
            <div className={styles.chatdetails}>

            <Avatar src={data.data[0].avatar}height={40} width={40} />
             <Link to={`profile/${props.userId}`} className={styles.lnk}>{data.data[0].fname} {data.data[0].lname}</Link>

            </div>
        </Card>
    );
};

export default UserChatDetailTopBar;