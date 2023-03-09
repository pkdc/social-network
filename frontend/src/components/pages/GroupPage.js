import CreateEvent from "../group/CreateEvent";
import GroupEvent from "../group/GroupEvent";
import GroupProfile from "../group/GroupProfile";
import AllPosts from "../posts/AllPosts";
import CreateGroupPost from "../group/CreateGroupPost";

import classes from './GroupPage.module.css';

const DATA = [
    {
        id: 1,
        user: 'username',
        content: 'this is the group post content',
        date: 'date'
},
{
    id: 2,
    user: 'username2',
    content: 'this is the group post content2',
    date: 'date2'
}
]

function GroupPage() {

    function createGroupPostHandler(GroupPostData) {
        // fetch(url, 
        // {
        //     method: 'POST',
        //     body: GroupPostData,
        //     headers: { 
        //         'Content-Type': 'application/json' 
        //     }
        // }).then(() => {
        //     navigate.replace('/')
        // })

    }
    return <div className={classes.container}>


        <div className={classes.mid}>
            <GroupProfile></GroupProfile>
            <CreateGroupPost onCreateGroupPost={createGroupPostHandler}/>
            <AllPosts posts={DATA}/>
        </div>
        <div className={classes.right}>
            <GroupEvent></GroupEvent>
            <CreateEvent></CreateEvent>
        </div>

     




    </div>
}

export default GroupPage;


