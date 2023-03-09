import classes from './Post.module.css'
// import profile from '../assets/profile.svg';
import Card from '../UI/Card';

function Post(props) {
    const defaultImagePath = "default_avatar.jpg";
    // return <div className={classes.container}>  
    return <Card className={classes.container} >
            <div className={classes["author"]}>
                {!props.avatar && <img className={classes["avatar"]} src={require("../../images/"+`${defaultImagePath}`)} alt="" width={"50px"}/>}
                {props.avatar && <img className={classes["avatar"]} src={props.avatar} alt="" width={"50px"}/>}
                <div><p className={classes["details"]}>{`${props.fname} ${props.name} (${props.nname})`}</p></div>
            </div>
            <div>{props.date}</div>
        <div className={classes.content}>{props.content}</div>
        {props.image && <div><img src={props.image} alt="" width={"100px"}/></div>}
        <div className={classes.comments}>Comments</div>
    </Card>

      
    // </div>
}

export default Post