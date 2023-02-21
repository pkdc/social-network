import Card from '../UI/Card';
import SmallButton from '../UI/SmallButton';
import classes from './GroupEvent.module.css';


function GroupEvent(props) {

    return <Card className={classes.card}>

            <div className={classes.container}>
        <div className={classes.date}>5 MAY </div>
        <div className={classes.title}>Title of Event</div>
        <div>description mdskn dajksd nsakjnkla ncdsnksd</div>
        <div className={classes.btn}>
            <SmallButton>Going</SmallButton><SmallButton>Not going</SmallButton>
        </div>

        
    </div>
    </Card>

}

export default GroupEvent;