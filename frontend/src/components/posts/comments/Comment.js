
import classes from './Comment.module.css'

// import profile from '../../assets/profile.svg'
import Avatar from '../../UI/Avatar';
    

function Comment(props) {
    const defaultImagePath = "default_avatar.jpg";
    return (
    <>
        <div className={classes["author"]}>
        {!props.avatar && <Avatar className={classes["comment-avatar"]} src={require("../../../images/"+`${defaultImagePath}`)} alt="" width={"50px"}/>}
                {props.avatar && <Avatar className={classes["comment-avatar"]} src={props.avatar} alt="" width={"50px"}/>}
            <div><p className={classes["details"]}>{`${props.fname} ${props.lname} (${props.nname})`}</p></div>
        </div>
        <div className={classes["create-at"]}>{props.createdAt}</div>
        <div className={classes.content}>{props.message}</div>
        {props.image && <div><img src={props.image} alt="" width={"100px"}/></div>}
    </>
    );
}

export default Comment;