import AllGroups from "../group/AllGroups";
import AllJoinedGroups from "../group/AllJoinedGroups";
import CreateGroup from "../group/CreateGroup";

import classes from './GroupPage.module.css';


const DATA = [
    {
        id: 1,
        title: 'title1',
        desc: 'this is a description',
        members: '10k',
        img: '/Users/madeleine/social-network/frontend/src/components/assets/profile.svg'
},
{
    id: 2,
    title: 'title2',
    desc: 'this is a description',
    members: '300',
    img: '/Users/madeleine/social-network/frontend/src/components/assets/profile.svg'
}
]

function GroupPage() {

return <div className={classes.container}>
    <div className={classes.mid}>
            <AllGroups allGroups={DATA}></AllGroups>
    </div>
    <div className={classes.right}>
        <CreateGroup></CreateGroup>
        <AllJoinedGroups myGroups={DATA}></AllJoinedGroups>
    </div>

</div>

}

export default GroupPage;