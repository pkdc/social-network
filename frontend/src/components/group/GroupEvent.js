import Card from '../UI/Card';
import GreyButton from '../UI/GreyButton';
import SmallButton from '../UI/SmallButton';
import classes from './GroupEvent.module.css';


function GroupEvent(props) {

    return <Card className={classes.card}>

            <div className={classes.container}>
        <div className={classes.date}>{props.date} </div>
        <div className={classes.title}>{props.title}</div>
        <div>{props.desc}</div>
        <div className={classes.btnWrapper}>
            {/* <button className={classes.btn}>Going</button><button className={classes.btn}>Not going</button> */}
            <GreyButton className={classes.btn}>Going</GreyButton>
            <GreyButton className={classes.btn}>Not Going</GreyButton>
        </div>

    </div>
    </Card>

}

export default GroupEvent;