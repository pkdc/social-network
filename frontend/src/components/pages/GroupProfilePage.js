import { useEffect, useState } from "react";
import AllEvents from "../group/AllEvents";
import CreateEvent from "../group/CreateEvent";
import CreateGroup from "../group/CreateGroup";
import GroupEvent from "../group/GroupEvent";
import GroupProfile from "../group/GroupProfile";
import AllPosts from "../posts/AllPosts";
import CreatePost from "../posts/CreatePost";

import classes from './GroupProfilePage.module.css';

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

const EVENTS = [
    {
        id: 1,
        title: 'title1',
        desc: 'this is the description',
        date: '2 MARCH'
},
{
    id: 2,
    title: 'title2',
    desc: 'this is the description2',
    date: '5 MAY'
}
]

function GroupProfilePage() {

    // const [isLoading, setIsLoading] = useState(true);
    // const [loaded, setLoaded] = useState([]);

    // useEffect(() => {
    //     setIsLoading(true)
    //     // const url = props.url
    //     fetch(
    //         'url'
    //     )
    //     .then(response => response.json())
    //     .then((data) => {
    //         const dataArr = [];

    //         for (const key in data) {
    //             const value = {
    //                 id: key,
    //                 ...data[key]
    //             };

    //             dataArr.push(value);
    //         }
    //         setIsLoading(false);
    //         setLoaded(dataArr);
    //     })
    // }, []);

    //// }, [props]);


    // if (isLoading) {
    //     return (<section>
    //         <p>Loading...</p>
    //         </section>
    // );
// }

    function postData(url, data) {
        fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    // return response.json()
    }

    function createPostHandler(url, postData) {
        let newEvent = postData(url, postData)
        newEvent.then(() => {
            // navigate.replace('/??')
        })

         ////////
        // fetch(url, 
        // {
        //     method: 'POST',
        //     body: postData,
        //     headers: { 
        //         'Content-Type': 'application/json' 
        //     }
        // }).then(() => {
        //     navigate.replace('/??')
        // })
        //////////////

    }

    function createEventHandler(url, eventData) {
        let newEvent = postData(url, eventData)
        newEvent.then(() => {
            // navigate.replace('/??')
        })

        ////////
        // fetch(url, 
        // {
        //     method: 'POST',
        //     body: eventData,
        //     headers: { 
        //         'Content-Type': 'application/json' 
        //     }
        // }).then(() => {
            // navigate.replace('/??')
        // })
        ///////

    }

    return <div className={classes.container}>

        <div className={classes.mid}>
            <GroupProfile></GroupProfile>
            <CreatePost onCreatePost={createPostHandler}/>
            <AllPosts posts={DATA}/>
        </div>
        <div className={classes.right}>
            <AllEvents events={EVENTS}></AllEvents>
            <CreateEvent onCreateEvent={createEventHandler}></CreateEvent>
            {/* <CreateGroup></CreateGroup> */}
        </div>

    </div>
}

export default GroupProfilePage;





// //POST fetch function
// async function postData(url = '', data = {}) {
//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     console.log('posted')

//     return response.json()
// }

// //GET fetch function
// async function getData(url = '') {
//     const response = await fetch(url, {
//         method: 'GET'
//     })

//     return response.json()
// }