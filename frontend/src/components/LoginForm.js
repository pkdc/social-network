import React, { useState } from "react";
import FormInput from "./UI/FormInput";
import FormLabel from "./UI/FormLabel";
import SubmitButton from "./UI/SubmitButton";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPw, setEnteredPw] = useState("");

    const emailChangeHandler = (e) => {
        setEnteredEmail(e.target.value);
        console.log(enteredEmail);
    };
    const pwChangeHandler = (e) => {
        setEnteredPw(e.target.value);
        console.log(enteredPw);
    };
        
    return (
        <form className={styles["login-form"]}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput name="email" id="email" placeholder="abc@mail.com" onChange={emailChangeHandler}/>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput type="password" name="password" id="password" placeholder="Password" onChange={pwChangeHandler}/>
            <SubmitButton type="submit">Login</SubmitButton>
        </form>
    )
};

export default LoginForm;