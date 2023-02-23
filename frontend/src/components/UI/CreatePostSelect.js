import React from "react";
import styles from "./CreatePostSelect.module.css";

const CreatePostSelect = (props) => {
    const classes = `${styles["select"]} ${props.className || ""}`
    return (
        <>
            <select className={classes} >
                {props.options.map((obj, i) => {
                    return <option key={i} value={obj["value"]}>{obj["text"]}</option>
                })}
            </select>
        </>
    )
};

export default CreatePostSelect;