import Card from '../UI/Card';
import SmallButton from '../UI/SmallButton';
import classes from './GroupEvent.module.css';


function GroupEvent(props) {

    return <Card className={classes.card}>

            <div className={classes.container}>
        <div className={classes.date}>{props.date} </div>
        <div className={classes.title}>{props.title}</div>
        <div>{props.desc}</div>
        <div className={classes.btn}>
            <SmallButton>Going</SmallButton><SmallButton>Not going</SmallButton>
        </div>

    </div>
    </Card>

}

export default GroupEvent;