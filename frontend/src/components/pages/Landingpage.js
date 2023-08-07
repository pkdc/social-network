import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../UI/Card";
import Form from "../UI/Form";
import LgButton from "../UI/LgButton";
import styles from "./Landingpage.module.css";
import { AuthContext } from "../store/auth-context";

const Homepage = () => {
    const [loginIsLoading, setLoginIsLoading] = useState(false);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        setLoginIsLoading(authCtx.loginIsLoading);
    }, [authCtx.loginIsLoading]);

    return (
        <>
        {!loginIsLoading && <div className={styles.wrapper}>
            <div className={styles["container"]}>
                <h1 className={styles["title"]}>Welcome</h1>
                <Link className={styles["nav-link"]} to="/login"><LgButton className={`${styles["nav-link-btn"]} ${styles["login-btn"]}`}>Login</LgButton></Link>
                <Link className={styles["nav-link"]} to="/reg"><LgButton className={`${styles["nav-link-btn"]} ${styles["reg-btn"]}`}>Register</LgButton></Link>
            </div>
        </div>}
        {loginIsLoading && <h2>Login Loading...</h2>}
        </>
    );
};

export default Homepage;