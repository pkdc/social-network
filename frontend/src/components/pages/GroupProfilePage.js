import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AllEvents from "../group/AllEvents";
import AllGroupPosts from "../group/AllGroupPosts";
import CreateEvent from "../group/CreateEvent";
import CreateGroup from "../group/CreateGroup";
import CreateGroupPost from "../group/CreateGroupPost";
import GroupEvent from "../group/GroupEvent";
import GroupProfile from "../group/GroupProfile";
import classes from './layout.module.css';
import useGet from "../fetch/useGet";

function GroupProfilePage() {
    const { state } = useLocation();
    const { id } = state; 
    const [ postData, setPostData ] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8080/group-post?groupid=${id}`)
            .then(resp => {
                return resp.json();
            })
            .then(data => {
        
                data.data.sort((a, b) => Date.parse(b.createdat) - Date.parse(a.createdat));
                console.log("sorted post data: ", data);
                setPostData(data.data)
            })
            .catch(
                err => console.log(err)
            );
    }, []);


    // const { error, isLoaded, data } = useGet(`/group-post?groupid=${id}`)

    // if (!isLoaded) return <div>Loading...</div>
    // if (error) return <div>Error: {error.message}</div>

    // data.data && data.data.sort((a, b) => Date.parse(b.createdat) - Date.parse(a.createdat));

    // setPostData(data.data)

    function onCreatePostHandler(postData) {

        fetch('http://localhost:8080/group-post', 
        {
            method: 'POST',
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(postData),
            headers: { 
                'Content-Type': 'application/json' 
            }
        }).then(() => {
            console.log("posted")

                fetch(`http://localhost:8080/group-post?groupid=${id}`)
                .then(resp => {
                    return resp.json();
                })
                .then(data => {
            
                    data.data.sort((a, b) => Date.parse(b.createdat) - Date.parse(a.createdat));
                    console.log("sorted post data: ", data);
                    setPostData(data.data)
                })
                .catch(
                    err => console.log(err)
                );

        })
        
    }

    return (
    <div className={classes.container}>
        <div className={classes.mid}>
            <GroupProfile groupid={id}></GroupProfile>
            <CreateGroupPost groupid={id} onCreatePost={onCreatePostHandler}/>
            {postData && 
            <AllGroupPosts groupid={id} posts={postData}/>
            }
      
        </div>
        <div className={classes.right}>
        <CreateEvent groupid={id}></CreateEvent>
        <AllEvents groupid={id}></AllEvents>
        </div>
    </div>
  
)}

export default GroupProfilePage;
