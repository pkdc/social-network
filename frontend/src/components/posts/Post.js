import classes from './Post.module.css'
// import profile from '../assets/profile.svg';
import Card from '../UI/Card';
import AllComments from './comments/AllComments';

function Post(props) {
    const defaultImagePath = "default_avatar.jpg";
    // return <div className={classes.container}>  
    return <Card className={classes.container} >
            <div className={classes["author"]}>
                {!props.avatar && <img className={classes["avatar"]} src={require("../../images/"+`${defaultImagePath}`)} alt="" width={"50px"}/>}
                {props.avatar && <img className={classes["avatar"]} src={props.avatar} alt="" width={"50px"}/>}
                <div>
                    <div className={classes["details"]}>{`${props.fname} ${props.name} (${props.nname})`}</div>
                    <div className={classes.date}>{props.date}</div>
                </div>
              
            </div>
        <div className={classes.content}>{props.content}</div>
        {props.image && <div><img src={props.image} alt="" width={"100px"}/></div>}
        <div className={classes.comments}>2 comments</div>
        <AllComments />
    </Card>

      
    // </div>
}

export default Post