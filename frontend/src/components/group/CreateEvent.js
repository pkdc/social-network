import Card from "../UI/Card";
import SmallButton from "../UI/SmallButton";

import classes from './CreateEvent.module.css';

function CreateEvent() {

    return <Card className={classes.card}>
            <form className={classes.container}>
        <input type="text" name="title" id="title" placeholder="Title"></input>
        <textarea className={classes.content} name="description" id="description" placeholder="Description"></textarea>
        <input type="datetime-local" name="date" id="date"></input>
        <div className={classes.btn}>
            <SmallButton>Create</SmallButton>
        </div>
        
    </form>
    </Card>

}

export default CreateEvent;