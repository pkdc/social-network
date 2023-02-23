import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../UI/LogoutButton";
import NotificationBtn from "../UI/NotificationBtn";

const MainNav = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/group">Groups</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><NotificationBtn>Bell</NotificationBtn></li>
                    <li> <LogoutButton>Logout</LogoutButton></li>
                    
                </ul>
            </nav>
        </header>
    );
};

export default MainNav;