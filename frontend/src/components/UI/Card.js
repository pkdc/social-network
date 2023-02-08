import styles from "./Card.module.css";

const Card = (props) => {
    // const classes = 'card ' + props.className;
    return (
        <>
            {!props.className && <div className={`${styles["card"]}`}>{props.children}</div>}
            {props.className && <div className={`${styles["card"]} ${styles[props.className]}`}>{props.children}</div>}
        </>
    )
};

export default Card;