import { Link } from "react-router-dom";
import LogoutButton from "../UI/LogoutButton";
import NotificationBtn from "../UI/NotificationBtn";
import styles from "./TopNav.module.css";

const TopMenu = () => {
    return (
        <nav>
            <ul className={styles["top-nav"]}>
                <li><NotificationBtn>&#128276;</NotificationBtn></li>
                <li> <LogoutButton>Logout</LogoutButton></li>
            </ul>
        </nav>
        
    );
};

export default TopMenu;