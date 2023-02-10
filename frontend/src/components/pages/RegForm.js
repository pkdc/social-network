import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from '../UI/Form';
import FormInput from "../UI/FormInput";
import FormLabel from "../UI/FormLabel";
import SubmitButton from "../UI/SubmitButton";
import styles from "./RegForm.module.css";

const RegForm = () => {
    const regURL = "http://localhost:8080/reg/";
    
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPw, setEnteredPw] = useState("");
    const [enteredFName, setEnteredFName] = useState("");
    const [enteredLName, setEnteredLName] = useState("");
    const [enteredDoB, setEnteredDoB] = useState("");
    const [enteredImg, setEnteredImg] = useState("");
    const [enteredNickname, setEnteredNickname] = useState("");
    const [enteredAbtMe, setEnteredAbtMe] = useState("");

    const emailChangeHandler = (e) => {
        setEnteredEmail(e.target.value);
        console.log(enteredEmail);
    };
    const pwChangeHandler = (e) => {
        setEnteredPw(e.target.value);
        console.log(enteredPw);
    };
        
    const submitHandler = (e) => {
        e.preventDefault();
        const regPayloadObj = {
            email: enteredEmail,
            pw: enteredPw
        };
        console.log(regPayloadObj);

        const reqOptions = {
            method: "POST",
            body: JSON.stringify(regPayloadObj)
        };
        fetch(regURL, reqOptions)
        .then(resp => {
            const respObj = resp.json();
            console.log(respObj);
            
        }
        )
        // setEnteredEmail("");
        // setEnteredPw("");
    };

    return (
        <>
            <h1 className={styles["title"]}>Register</h1>
            <Form className={styles["login-form"]} onSubmit={submitHandler}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormInput name="email" id="email" placeholder="abc@mail.com" value={enteredEmail} onChange={emailChangeHandler}/>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormInput type="password" name="password" id="password" placeholder="Password" value={enteredPw} onChange={pwChangeHandler}/>
                <SubmitButton type="submit">Register</SubmitButton>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </Form>
        </>
        
    )
};

export default RegForm;