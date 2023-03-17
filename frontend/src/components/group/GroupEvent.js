import Card from '../UI/Card';
import GreyButton from '../UI/GreyButton';
import SmallButton from '../UI/SmallButton';
import classes from './GroupEvent.module.css';


function GroupEvent(props) {


    //get userid, eventid, status?
    function handleClick() {
        fetch('https://social-network-cffc1-default-rtdb.firebaseio.com/group-event-member.json', 
        {
            method: 'POST',
            body: JSON.stringify(),
            headers: { 
                'Content-Type': 'application/json' 
            }
        }).then(() => {
            // navigate.replace('/??')
            console.log("posted")
        })
        console.log()
    }

    return <Card className={classes.card}>

            <div className={classes.container}>
        <div className={classes.date}>{props.date} </div>
        <div className={classes.title}>{props.title}</div>
        <div>{props.desc}</div>
        <div className={classes.btnWrapper}>
            {/* <button className={classes.btn}>Going</button><button className={classes.btn}>Not going</button> */}
            <GreyButton className={classes.btn} onClick={handleClick}>Going</GreyButton>
            <GreyButton className={classes.btn}>Not Going</GreyButton>
        </div>

    </div>
    </Card>

}

export default GroupEvent;