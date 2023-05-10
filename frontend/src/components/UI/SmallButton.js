import styles from './SmallButton.module.css'

const SmallButton = (props) => {
    // const classes = `${styles["lg-btn"]} ${styles[props.className] || ""}`;
    const classes = `${styles["small-btn"]}` + " " + props.className;
    return (
        <>
            <div className={classes} type={props.type} onClick={props.onClick}>{props.children}</div>
        </>
    )
};

export default SmallButton;