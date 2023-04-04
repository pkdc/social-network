import useGet from '../fetch/useGet';
import Card from '../UI/Card';
import GreyButton from '../UI/GreyButton';
import SmallButton from '../UI/SmallButton';
import classes from './GroupEvent.module.css';


function GroupEvent(props) {
    
    //get userid, eventid, status?
    function handleGoing() {
        fetch('https://localhost:8080/group-event', 
        {
            method: 'POST',
            body: JSON.stringify(),
            headers: { 
                'Content-Type': 'application/json' 
            }
        }).then(() => {
            // navigate.replace('/??')
            console.log("event created")
        })
      
    }

    function handleNotGoing() {

    }

    return <Card className={classes.card}>

        <div className={classes.container}>
            <div className={classes.date}>{props.date} </div>
            <div className={classes.title}>{props.title}</div>
            <div>{props.description}</div>
            <div className={classes.btnWrapper}>
                <GreyButton className={classes.btn} onClick={handleGoing}>Going</GreyButton>
                <GreyButton className={classes.btn} onClick={handleNotGoing}>Not Going</GreyButton>
            </div>
        </div>
    </Card>

}

export default GroupEvent;