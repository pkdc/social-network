import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "../UI/LogoutButton";
import NotificationBtn from "../UI/NotificationBtn";
import styles from "./TopNav.module.css";
import logout from "../assets/logout.svg";
import profile from "../assets/profileSmall.svg";

const TopMenu = () => {
    const navigate = useNavigate();

    // const currUserId = localStorage.getItem("user_id");
    // console.log("current user", currUserId);

    const testID = '4'

    function handleClick(e) {
        const id = e.target.id
        console.log("profile id", id);


        
        console.log("profile id: ", id)
        navigate("/profile", {
            state: {
                id
            }
        })
        
    }

    return (
        <nav>
            <div className={styles["top-nav"]}>
                <div className={styles.logo}>notFacebook</div>
                <div className={styles.menu}>
                    <Link className={styles.lnk} to="/">Home</Link>
                    <Link className={styles.lnk} to="/group">Groups</Link>
                    <Link className={styles.lnk} to="/messanger">Messenger</Link>
                    <div className={styles.profile}>
                    {/* <img src={profile} alt=""/> */}
                    <div id={testID} className={styles.profile} onClick={handleClick}>
                    <img src={profile} alt=""/>
                    MaddieWesst
                    </div>
                    </div>
                </div>
                {/* <NotificationBtn>&#128276;</NotificationBtn> */}
                <LogoutButton ><img src={logout} alt=""/></LogoutButton>
            </div>
        </nav>
        
    );
};

export default TopMenu;