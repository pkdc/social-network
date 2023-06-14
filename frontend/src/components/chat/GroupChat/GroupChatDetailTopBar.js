import { useNavigate } from "react-router-dom";
import Card from "../../UI/Card";
import useGet from "../../fetch/useGet";
import styles from "../UserChat/ChatDetailTopBar.module.css";
const GroupChatDetailTopBar = (props) => {

    const navigate = useNavigate();
    

    const { error, isLoaded, data } = useGet(`/group?id=${props.groupId}`)

    if (!isLoaded) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>


    function handleClick() {
        const id =  props.groupId
        navigate("/groupprofile", { state: { id } })
        
    }

    return (
        <Card className={styles["container"]}>
            <div className={styles.chatdetails}>
                <div className={styles.lnk} onClick={handleClick}>

                    {data.data[0].title}
                </div>
            </div>
        </Card>
    );
};

export default GroupChatDetailTopBar;