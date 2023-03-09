import React from "react";
import { Link } from "react-router-dom";
import styles from "./MainNav.module.css";

const MainNav = () => {
    return (
        <header>
            <nav>
                <ul className={styles["main-nav"]}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/group">Groups</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNav;