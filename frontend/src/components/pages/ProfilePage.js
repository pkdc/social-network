import AllPosts from "../posts/AllPosts"
import CreatePost from "../posts/CreatePost";
import Followers from "../profile/followers";
import Following from "../profile/following";
import Profile from "../profile/Profile";
import FollowRequest from "../requests/FollowRequest";

// import classes from './ProfilePage.module.css';
import classes from './layout.module.css';

const DATA = [
    {
        id: 1,
        user: 'username',
        content: 'this is the post content',
        date: 'date'
},
{
    id: 2,
    user: 'username2',
    content: 'this is the post content2',
    date: 'date2'
}
]

function ProfilePage() {

    return <div className={classes.container}>
     <div className={classes.mid}>
        {/* <CreatePost></CreatePost> */}
        <Profile></Profile>

        <AllPosts posts={DATA}></AllPosts>
 
        </div>
        <div className={classes.right}>
            <Followers></Followers>
            <Following
           
         </div>

        </div>
}

export default ProfilePage;