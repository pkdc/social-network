import Card from "../../UI/Card";
import styles from "./UserMsgArea.module.css";

const UserMsgArea = (props) => {

    return (
        <Card className={styles["msg-area"]} style={{height: `${window.innerHeight-316}px`}}>
            
        </Card>
    );
};

export default UserMsgArea;