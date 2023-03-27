import { useLocation } from "react-router-dom";
import useGet from "../fetch/useGet";
import AllPosts from "../posts/AllPosts"
import CreatePost from "../posts/CreatePost";
import Followers from "../profile/followers";
import Following from "../profile/following";
import Profile from "../profile/Profile";
import FollowRequest from "../requests/FollowRequest";

// import classes from './ProfilePage.module.css';
import classes from './layout.module.css';

function ProfilePage() {

    const { state } = useLocation();
    const { id } = state;
    console.log("id", id); 




    return <div className={classes.container}>
     <div className={classes.mid}>
        {/* <CreatePost></CreatePost> */}
        <Profile userId={id}></Profile>
        <AllPosts userId={id}></AllPosts>
 
        </div>
        <div className={classes.right}>
            <Followers userId={id}></Followers>
            <Following userId={id}></Following>
         </div>
        </div>
}

export default ProfilePage;