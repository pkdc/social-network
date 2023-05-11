import { useNavigate } from "react-router-dom";
import Card from "../UI/Card";
import SmallButton from "../UI/SmallButton";

import classes from './Group.module.css';

function Group(props) {

    const currUserId = localStorage.getItem("user_id");
    console.log("group curr id", currUserId);
    

    function handleClick(e) {
        const id = e.target.id;

        const data = {
            id: 0,
            userid: parseInt(currUserId),
            groupid: parseInt(id),
            status: 0,
        };

        console.log({data})
    
        fetch('http://localhost:8080/group-request', 
        {
            method: 'POST',
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(data),
            headers: { 
                'Content-Type': 'application/json' 
            }
        }).then(() => {
            // navigate.replace('/??')
            console.log("group request posted")
        })
    }

    return <Card>
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.img}></div>
                <div>
                    <div className={classes.title}>{props.title}</div>
                    <div className={classes.members}>{props.members} members</div>
                    <div className={classes.desc}>{props.description}</div>
                </div>
             
            </div>
            <div className={classes.btn}>
                <div className={classes.smallbtn} id={props.id} onClick={handleClick}>Join</div>
            </div>
        </div>
    </Card>
}

export default Group; 