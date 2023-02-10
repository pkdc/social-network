import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from '../UI/Form';
import FormInput from "../UI/FormInput";
import FormLabel from "../UI/FormLabel";
import SubmitButton from "../UI/SubmitButton";
import styles from "./RegForm.module.css";

const RegForm = () => {
    const regURL = "http://localhost:8080/reg/";
    
    const imageSrc = "/images/";

    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPw, setEnteredPw] = useState("");
    const [enteredFName, setEnteredFName] = useState("");
    const [enteredLName, setEnteredLName] = useState("");
    const [enteredDoB, setEnteredDoB] = useState("");
    const [enteredImg, setEnteredImg] = useState("");
    const [enteredNickname, setEnteredNickname] = useState("");
    const [enteredAbout, setEnteredAbout] = useState("");

    const emailChangeHandler = (e) => {
        setEnteredEmail(e.target.value);
        console.log(enteredEmail);
    };
    const pwChangeHandler = (e) => {
        setEnteredPw(e.target.value);
        console.log(enteredPw);
    };
    const fNameChangeHandler = (e) => {
        setEnteredFName(e.target.value);
        console.log(enteredFName);
    };
    const lNameChangeHandler = (e) => {
        setEnteredLName(e.target.value);
        console.log(enteredLName);
    };
    const doBChangeHandler = (e) => {
        setEnteredDoB(e.target.value);
        console.log(enteredDoB);
    };
    const imgChangeHandler = (e) => {
        setEnteredImg(e.target.value);
        console.log(enteredImg);
    };
    const nicknameChangeHandler = (e) => {
        setEnteredNickname(e.target.value);
        console.log(enteredNickname);
    };
    const aboutChangeHandler = (e) => {
        setEnteredAbout(e.target.value);
        console.log(enteredAbout);
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
            <Form className={styles["reg-form"]} onSubmit={submitHandler}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormInput type="email" name="email" id="email" placeholder="abc@mail.com" value={enteredEmail} onChange={emailChangeHandler}/>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormInput type="password" name="password" id="password" placeholder="Password" value={enteredPw} onChange={pwChangeHandler}/>
                <FormLabel htmlFor="fname">First Name</FormLabel>
                <FormInput type="text" name="fname" id="fname" placeholder="John" value={enteredFName} onChange={fNameChangeHandler}/>
                <FormLabel htmlFor="lname">Last Name</FormLabel>
                <FormInput type="text" name="lname" id="lname" placeholder="Smith" value={enteredLName} onChange={lNameChangeHandler}/>
                <FormLabel htmlFor="DoB">Date of Birth</FormLabel>
                <FormInput type="date" name="DoB" id="DoB" value={enteredDoB} onChange={doBChangeHandler}/>
                <FormLabel htmlFor="img">Avatar (Optional)</FormLabel>
                <img src={require("../../images/0.png")} alt="test" width={"220px"}/>
                <FormInput type="select" name="img" id="img" value={enteredImg} onChange={imgChangeHandler}/>
                <FormLabel htmlFor="nname">Nickname (Optional)</FormLabel>
                <FormInput type="text" name="nname" id="nname" placeholder="Smith" value={enteredNickname} onChange={nicknameChangeHandler}/>
                <FormLabel htmlFor="about">About Me (Optional)</FormLabel>
                <textarea name="about" id="about" placeholder="About me..." rows={3} value={enteredAbout} onChange={aboutChangeHandler}/>
                <SubmitButton type="submit">Register</SubmitButton>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </Form>
        </>
        
    )
};

export default RegForm;