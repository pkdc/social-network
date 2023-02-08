import React from "react";
import FormInput from "./UI/FormInput";
import FormLabel from "./UI/FormLabel";
import SubmitButton from "./UI/SubmitButton";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
    return (
        <form className={styles["login-form"]}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput name="email" id="email" placeholder="abc@mail.com"/>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput type="password" name="password" id="password" placeholder="Password"/>
            <SubmitButton type="submit">Login</SubmitButton>
        </form>
    )
};

export default LoginForm;