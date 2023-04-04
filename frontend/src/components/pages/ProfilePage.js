import { useLocation } from "react-router-dom";
import AllPosts from "../posts/AllPosts"
import CreatePost from "../posts/CreatePost";
import Followers from "../profile/followers";
import Following from "../profile/following";
import Profile from "../profile/Profile";
import FollowRequest from "../requests/FollowRequest";

// import classes from './ProfilePage.module.css';
import classes from './layout.module.css';

// const DATA = [
//     {
//         id: 1,
//         user: 'username',
//         content: 'this is the post content',
//         date: 'date'
// },
// {
//     id: 2,
//     user: 'username2',
//     content: 'this is the post content2',
//     date: 'date2'
// }
// ]

function ProfilePage() {
    const sessionUrl = "http://localhost:8080/session";
    const { state } = useLocation();
    console.log("state", state);

    const { id } = state;
    console.log("id", id); 

    return <div className={classes.container}>
     <div className={classes.mid}>
        {/* <CreatePost></CreatePost> */}
        <Profile userId={id}></Profile>
        {/* <AllPosts userId={id}></AllPosts> */}
 
        </div>
        <div className={classes.right}>
            <Followers userId={id}></Followers>
            <Following userId={id}></Following>
         </div>
        </div>
}

export default ProfilePage;