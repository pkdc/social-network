import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useGet from "../fetch/useGet";
import AllPosts from "../posts/AllPosts"
import CreatePost from "../posts/CreatePost";
import Followers from "../profile/followers";
import Following from "../profile/following";
import Profile from "../profile/Profile";
import ProfilePosts from "../profile/profilePost";
import FollowRequest from "../requests/FollowRequest";
import { FollowingContext } from "../store/following-context";

// import classes from './ProfilePage.module.css';
import { useParams } from "react-router-dom";
import classes from './layout.module.css';

function ProfilePage() {
    const [commentData, setCommentData] = useState([]);

    const followingCtx = useContext(FollowingContext);

    const { data } = useGet(`/post`)

    const sessionUrl = "http://localhost:8080/session";
    // const { state } = useLocation();
    // const { id } = state;
    const params = useParams();
    const id = params.userId;
    console.log("id---", id); 

    const postData = data.filter(x => x.author == id)

    // get comments
    useEffect(() => {
        fetch("http://localhost:8080/post-comment")
        .then(resp => resp.json())
        .then(data => {
            // console.log("post page raw comment data: ", data)
            // setCommentData(data);
            data.sort((a, b) => Date.parse(a.createdat) - Date.parse(b.createdat)); // ascending order
            // console.log("post page sorted comment data: ", data)
            setCommentData(data);
        })
        .catch(
            err => console.log(err)
        );
    }, []);

    // let curFollowing;
    // const [curFollowing, setCurFollowing] = useState(false);
    // const checkCurFollowing = () => {
    //     const storedFollowing = JSON.parse(localStorage.getItem("following"));
    //     console.log("stored following (profile)", storedFollowing);
    //     if (followingCtx.following) setCurFollowing(followingCtx.following.some(followingUser => followingUser.id === +id))
    // };

    // useEffect(() => checkCurFollowing(), [followingCtx.following]);
    

    return <div className={classes.container}>
     <div className={classes.mid}>
        {/* <CreatePost></CreatePost> */}
        <Profile userId={id} ></Profile>
        {/* <ProfilePosts userId={id}></ProfilePosts> */}
        <AllPosts userId={id} posts={postData} comments={commentData}></AllPosts>

        </div>
        <div className={classes.right}>
            <Followers userId={id}></Followers>
            <Following userId={id}></Following>
         </div>
        </div>
}

export default ProfilePage;