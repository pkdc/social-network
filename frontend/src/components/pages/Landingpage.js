import React from "react";
import { Link } from "react-router-dom";
import Card from "../UI/Card";
import Form from "../UI/Form";
import LgButton from "../UI/LgButton";
import styles from "./Landingpage.module.css";

const Homepage = () => {
    return (
        <div className={styles.wrapper}>

            <div className={styles["container"]}>
                <h1 className={styles["title"]}>Welcome</h1>
                <Link className={styles["nav-link"]} to="/login"><LgButton className={styles["nav-link-btn"]}>Login</LgButton></Link>
                <Link className={styles["nav-link"]} to="/reg"><LgButton className={styles["nav-link-btn"]}>Register</LgButton></Link>
            </div>
        </div>
    );
};

export default Homepage;