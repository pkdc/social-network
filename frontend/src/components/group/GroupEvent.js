import useGet from '../fetch/useGet';
import Card from '../UI/Card';
import GreyButton from '../UI/GreyButton';
import SmallButton from '../UI/SmallButton';
import classes from './GroupEvent.module.css';


function GroupEvent(props) {

    var myDate = new Date(props.date);
    var mills = myDate.getTime();


    const newDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: '2-digit',  hour: 'numeric',
    minute: 'numeric',}).format(mills);

    const currUserId = localStorage.getItem("user_id");

    function handleNotGoing(e) {
        const id = e.target.id;

        const data = {
            id: 0,
            status: 0,
            userid: currUserId,
            eventid: id,
        };

        fetch('http://localhost:8080/group-event-member', 
        {
            method: 'POST',
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(data),
            headers: { 
                'Content-Type': 'application/json' 
            }
        }).then(() => {
            // navigate.replace('/??')
            console.log("posted")
        })
    }

    function handleGoing(e) {
        const id = e.target.id;

        const data = {
            id: 0,
            status: 1,
            userid: parseInt(currUserId),
            eventid: parseInt(id),
        };

        fetch('http://localhost:8080/group-event-member', 
        {
            method: 'POST',
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(data),
            headers: { 
                'Content-Type': 'application/json' 
            }
        }).then(() => {
            // navigate.replace('/??')
            console.log("posted")
        })
    }

    return <Card className={classes.card}>

        <div className={classes.container}>
            <div className={classes.date}>{newDate} </div>
            <div className={classes.title}>{props.title}</div>
            <div>{props.description}</div>
            <div className={classes.btnWrapper}>
                <div id={props.id} className={classes.btn} onClick={handleGoing}>Going</div>
                <div id={props.id} className={classes.btn} onClick={handleNotGoing}>Not Going</div>
            </div>
        </div>
    </Card>

}

export default GroupEvent;