import AllGroups from "../group/AllGroups";
import AllJoinedGroups from "../group/AllJoinedGroups";
import CreateGroup from "../group/CreateGroup";
import JoinedGroups from "../group/JoinedGroup";

// import classes from './GroupPage.module.css';
import classes from './layout.module.css';

function GroupPage() {

return <div className={classes.container}>
    <div className={classes.mid}>
            <AllGroups></AllGroups>
    </div>
    <div className={classes.right}>
        <CreateGroup></CreateGroup>
        <JoinedGroups></JoinedGroups>
    </div>

</div>

}

export default GroupPage;