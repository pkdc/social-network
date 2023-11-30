import React from "react";
import styles from "./LgButton.module.css";

type BtnProps = {
    children?: React.ReactNode,
    className?: string,
    type?: "submit" | "reset" | "button" | undefined,
    onClick?: (e: React.MouseEvent) => void,
};

const LgButton: React.FC<BtnProps> = (props) => {
    // const classes = `${styles["lg-btn"]} ${styles[props.className] || ""}`;
    const classes = `${styles["lg-btn"]} ${props.className}`;
    return (
        <>
            <button className={classes} type={props.type} onClick={props.onClick}>{props.children}</button>
        </>
    )
};

export default LgButton;