import styles from "./Avatar.module.css";

const Avatar = (props) => {
    const classes = `${styles["avatar"]} ${props.className || ""}`;
    return (
        <>
            <img className={classes} src={props.src} alt={props.alt} height={props.height} width={props.width} />
        </>
    )
};

export default Avatar;