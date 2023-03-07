import Card from "../UI/Card";
import JoinedGroup from "./JoinedGroup";
import classes from './AllJoinedGroups.module.css';

function AllJoinedGroups(props) {
    return <Card>
        <div className={classes.label}>
        Groups you've joined
        </div>
           {props.myGroups.map((group) => (
            <JoinedGroup
        key={group.id}
        id={group.id}
        title={group.title} 
        members={group.members}
        desc={group.desc}  
        img={group.img}
        />
        ))}
    </Card>
}

export default AllJoinedGroups;