import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AllEvents from "../group/AllEvents";
import AllGroupPosts from "../group/AllGroupPosts";
import CreateEvent from "../group/CreateEvent";
import CreateGroup from "../group/CreateGroup";
import CreateGroupPost from "../group/CreateGroupPost";
import GroupEvent from "../group/GroupEvent";
import GroupProfile from "../group/GroupProfile";
// import AllPosts from "../posts/AllPosts";
// import CreatePost from "../posts/CreatePost";

// import classes from './GroupProfilePage.module.css';
import classes from './layout.module.css';

function GroupProfilePage() {
    const [commentData, setCommentData] = useState([]);
    const { state } = useLocation();
    const { id } = state; 
    console.log("group id", id);

    // get comments
    // useEffect(() => {
    //     fetch(`http://localhost:8080/group-post-comment?id=${id}`)
    //         .then(resp => resp.json())
    //         .then(data => {
    //             // console.log("post page raw comment data: ", data)
    //             // setCommentData(data);
    //             // data.sort((a, b) => Date.parse(a.createdat) - Date.parse(b.createdat)); // ascending order
    //             // console.log("post page sorted comment data: ", data)
    //             setCommentData(data);
    //             console.log("comments data", data)
    //         })
    //         .catch(
    //             err => console.log("98765",err)
    //         );
    // }, []);

    // const createCommentSuccessHandler = (createCommentSuccessful) => {
    //     // fetch comment
    //     if (createCommentSuccessful) {
    //         fetch(`http://localhost:8080/group-post-comment?id=${id}`)
    //         .then(resp => resp.json())
    //         .then(data => {
    //             // console.log("post page raw comment data: ", data)
    //             // setCommentData(data);
    //             data.sort((a, b) => Date.parse(a.createdat) - Date.parse(b.createdat)); // ascending order
    //             console.log("post page sorted comment data: ", data)
    //             setCommentData(data);
    //         })
    //         .catch(
    //             err => console.log(err)
    //         );
    //     }
    // };
//onCreateCommentSuccessful={createCommentSuccessHandler}
    return (
    <div className={classes.container}>
        <div className={classes.mid}>
            <GroupProfile groupid={id}></GroupProfile>
            <CreateGroupPost groupid={id}/>
            <AllGroupPosts groupid={id} comments={commentData} />
      
        </div>
        <div className={classes.right}>
        <CreateEvent groupid={id}></CreateEvent>
        <AllEvents groupid={id}></AllEvents>
        </div>
    </div>
  
)}

export default GroupProfilePage;
