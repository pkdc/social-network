import { Link, NavLink, useNavigate } from "react-router-dom";
import LogoutButton from "../UI/LogoutButton";
import NotificationBtn from "../UI/NotificationBtn";
import styles from "./TopNav.module.css";
import logout from "../assets/logout.svg";
import profile from "../assets/profileSmall.svg";

const TopMenu = (props) => {
    const defaultImagePath = "default_avatar.jpg";
    const userId = +localStorage.getItem("user_id");
    const first = localStorage.getItem("fname");
    const last = localStorage.getItem("lname");
    const nickname = localStorage.getItem("nname");
    const avatar = localStorage.getItem("avatar");
    
    const navigate = useNavigate();
    const onClickingLogout = () => {
        props.onLogout();
        navigate("/", {replace: true});
    };

    return (
        <nav>
            <div className={styles["top-nav"]}>
                <Link to={"/"} className={styles.logo}>notFacebook</Link>
                <div className={styles.menu}>
                    <NavLink className={({isActive}) => isActive ? styles["active"] : undefined} to="/">Home</NavLink>
                    <NavLink className={({isActive}) => isActive ? styles["active"] : undefined} to="/group">Groups</NavLink>
                    <NavLink className={({isActive}) => isActive ? styles["active"] : undefined} to="/messanger">Messenger</NavLink>
                    <div className={styles.profile}>
                    {/* <img src={profile} alt=""/> */}
                    <Link className={styles.profile} to="/profile">
                    <img src={profile} alt=""/>
                    Maddie Wesst
                    </Link>
                    </div>
                </div>
                {/* <NotificationBtn>&#128276;</NotificationBtn> */}
                <LogoutButton onClick={onClickingLogout}><img src={logout} alt=""/></LogoutButton>
            </div>
        </nav>
        
    );
};

export default TopMenu;