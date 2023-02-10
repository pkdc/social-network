import React from "react";
import { Link } from "react-router-dom";
import Form from "../UI/Form";
import SubmitButton from "../UI/SubmitButton";
import styles from "./Homepage.module.css";

const Homepage = () => {
    return (
        <div>
            <h1 className={styles["title"]}>Welcome Home</h1>
            <Form>
                <Link to="/login"><SubmitButton className={styles["nav-link"]}>Login</SubmitButton></Link>
                <SubmitButton><Link to="/reg" className={styles["nav-link"]}>Register</Link></SubmitButton>
            </Form>
        </div>
    
    )
};

export default Homepage;