import Card from "../UI/Card";
import SmallButton from "../UI/SmallButton";

import classes from './CreateGroup.module.css';

function CreateGroup() {

    return <Card className={classes.card}>
        Create Group
            <form className={classes.container}>
        <input type="text" name="title" id="title" placeholder="Title"></input>
        <textarea className={classes.content} name="description" id="description" placeholder="Description"></textarea>
        <div className={classes.btn}>
            <SmallButton>Create</SmallButton>
        </div>
        
    </form>
    </Card>

}

export default CreateGroup;