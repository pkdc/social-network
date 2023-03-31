import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LogoutButton from "../UI/LogoutButton";
import NotificationBtn from "../UI/NotificationBtn";
import styles from "./TopNav.module.css";
import logout from "../assets/logout.svg";
import profile from "../assets/profileSmall.svg";
import Avatar from "../UI/Avatar";
import AuthContext from "../store/auth-context";

const TopMenu = (props) => {
    let nickname;
    let avatar;
    const defaultImagePath = "default_avatar.jpg";
    const userId = +localStorage.getItem("user_id");
    const first = localStorage.getItem("fname");
    const last = localStorage.getItem("lname");
    nickname = localStorage.getItem("nname");
    avatar = localStorage.getItem("avatar");
    let details;

    const navigate = useNavigate();

    const ctx = useContext(AuthContext);

    const onClickingLogout = () => {
        // props.onLogout();
        ctx.onLogout();
        navigate("/", {replace: true});
    };
    
    return (
        <nav>
            <div className={styles["top-nav"]}>
                <Link to={"/"} className={styles.logo}>notFacebook</Link>
                <div className={styles.menu}>
                    <NavLink className={({isActive}) => isActive ? styles["active"] : undefined} to="/" end>Home</NavLink>
                    <NavLink className={({isActive}) => isActive ? styles["active"] : undefined} to="/group" end>Groups</NavLink>
                    <NavLink className={({isActive}) => isActive ? styles["active"] : undefined} to="/messanger" end>Messenger</NavLink>
                    <div className={styles.profile}>
                    {/* <img src={profile} alt=""/> */}
                    <Link className={styles.profile} to={`/profile/${userId}`}>
                    {!avatar && <img className={styles["avatar"]} src={require("../../images/"+`${defaultImagePath}`)} alt="" width={"35px"}/>}
                    {avatar && <Avatar src={avatar} alt="" width={"35px"}/>}
                    {nickname ? `${first} ${last} (${nickname})` : `${first} ${last}`}
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