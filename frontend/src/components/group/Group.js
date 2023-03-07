import Card from "../UI/Card";
import SmallButton from "../UI/SmallButton";

import classes from './Group.module.css';

function Group(props) {
    return <Card>
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.img}></div>
                <div>
                    <div className={classes.title}>{props.title}</div>
                    <div className={classes.members}>{props.members} members</div>
                    <div className={classes.desc}>{props.desc}</div>
                </div>
             
            </div>
            <div className={classes.btn}>
                <SmallButton>Join</SmallButton>
            </div>
         
        </div>
  
    </Card>
}

export default Group; 