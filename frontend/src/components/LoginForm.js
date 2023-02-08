import React from "react";
import FormInput from "./UI/FormInput";
import FormLabel from "./UI/FormLabel";
import SubmitButton from "./UI/SubmitButton";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
    return (
        <form className={styles["login-form"]}>
        <FormLabel>Email</FormLabel>
            <FormInput/>
            <FormLabel>Password</FormLabel>
            <FormInput/>
            <SubmitButton>Login</SubmitButton>
        </form>
    )
};

export default LoginForm;