import Group from "./Group";

import classes from './AllGroups.module.css';

function AllGroups(props) {
    return <div className={classes.container}>
        {props.allGroups.map((group) => (
         <Group
        key={group.id}
        id={group.id}
        title={group.title} 
        members={group.members}
        desc={group.desc}  
        img={group.img}
        />
        ))}
            </div>
}

export default AllGroups;


