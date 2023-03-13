import classes from './Post.module.css'
// import profile from '../assets/profile.svg';
import AllComments from "./comments/AllComments";
import CreateComment from './comments/CreateComment';
import Avatar from '../UI/Avatar';
import Card from '../UI/Card';
import { useState } from 'react';

function Post(props) {
    const [showComments, setShowComments] = useState(false);
    const defaultImagePath = "default_avatar.jpg";
    const getCommentUrl = ""
    // return <div className={classes.container}>
    const showCommentsHandler = () => {
        console.log(showComments);
        !showComments && setShowComments(true);
        showComments && setShowComments(false);

       
    };


    return <Card className={classes.container} >
            <div className={classes["author"]}>
                {!props.avatar && <Avatar className={classes["post-avatar"]} src={require("../../images/"+`${defaultImagePath}`)} alt="" width={"50px"}/>}
                {props.avatar && <Avatar className={classes["post-avatar"]} src={props.avatar} alt="" width={"50px"}/>}
                <div><p className={classes["details"]}>{`${props.fname} ${props.lname} (${props.nname})`}</p></div>
            </div>
            <div>{props.date}</div>
        <div className={classes.content}>{props.content}</div>
        {props.image && <div><img src={props.image} alt="" width={"100px"}/></div>}
        <div className={classes.comments} onClick={showCommentsHandler}>Comments</div>
        {showComments && 
            <>
            <AllComments/>
            <CreateComment/> 
            </>
        }
        
    </Card>

      
    // </div>
}

export default Post